import React, { useCallback, useState } from "react";
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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNetworks } from "../../hooks/api/useNetworks";
import { TransitionProps } from "@material-ui/core/transitions";

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
  shared64: string;
};

const validationSchema = yup.object().shape({
  shared64: yup.string().required(),
});

type P = {
  isMobile?: boolean;
};

export const ImportNetworkDialog = (p: P) => {
  const { importNetwork } = useNetworks(),
    [isNew, setNew] = useState(false),
    { register, errors, handleSubmit } = useForm<ImportNetworkForm>({
      validationSchema,
    });

  const onImport = useCallback(
    async (data: ImportNetworkForm) => {
      importNetwork(data.shared64).then(
        (isSuccess) => isSuccess && setNew(false)
      );
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
              <TextField
                name="shared64"
                inputRef={register}
                error={!!errors.shared64}
                helperText={errors?.shared64?.message}
                label="Shared content"
                rows={15}
                fullWidth
                multiline
                variant="outlined"
              />
            ) }
          </FlexContent>
          <DialogActions>
            <Button type="submit" color="primary" variant="outlined">
              import
            </Button>
            <Button color="default" variant="outlined" onClick={()=>setNew(false)}>
              cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
