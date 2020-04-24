import React, {useCallback, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  styled,
  TextField,
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {useNetworks} from "../../hooks/api/useNetworks";
import {TransitionProps} from "@material-ui/core/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FlexContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

type ImportNetworkForm = {
  name: string;
  sharedFile: FileList
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .notRequired()
    .matches(/^[a-zA-Z0-9\-_@#%!&$]*$/)
    .min(3)
    .max(16),
  sharedFile: yup.mixed().required()
});

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});

type P = {
  isMobile?: boolean;
};

export const ImportNetworkDialog = (p: P) => {
  const {importNetwork} = useNetworks(),
    [isNew, setNew] = useState(false),
    {register, errors, handleSubmit, watch} = useForm<ImportNetworkForm>({
      validationSchema,
    });

  const file = watch('sharedFile')

  const onImport = useCallback(
    async (data: ImportNetworkForm) => {
      const sharedFile = data.sharedFile.item(0)
      if (sharedFile) {
        const shared64 = await toBase64(sharedFile)
        importNetwork(shared64, data.name).then(
          (isSuccess) => isSuccess && setNew(false)
        );
      }

    },
    [importNetwork]
  );

  return (
    <>
      <Button fullWidth color="primary" onClick={() => setNew(true)}>
        import
      </Button>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={isNew}
        fullScreen={p.isMobile}
        fullWidth
        maxWidth="sm"
        onClose={() => setNew(false)}
      >
        <form onSubmit={handleSubmit(onImport)}>
          <DialogTitle>Import Network</DialogTitle>
          <FlexContent>
            {isNew && (
              <>
                <TextField
                  name="name"
                  inputRef={register}
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  label="Network name"
                  margin='normal'
                  fullWidth
                />
                {file && file.length > 0 && (
                  <TextField
                    margin='normal'
                    label='file:'
                    value={file.item(0)?.name}
                    fullWidth
                    disabled
                  />
                )}
                <Button
                  variant="contained"
                  component="label"
                  disabled={!!file}
                >
                  Upload File
                  <input
                    ref={register}
                    name='sharedFile'
                    type="file"
                    style={{display: "none"}}
                  />
                </Button>
              </>
            )}
          </FlexContent>
          <DialogActions>
            <Button type="submit" color="primary" variant="outlined">
              import
            </Button>
            <Button color="default" variant="outlined" onClick={() => setNew(false)}>
              cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
