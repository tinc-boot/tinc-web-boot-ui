import React, {useCallback} from "react";
import {Box, Button, DialogActions, DialogContent, DialogTitle, Divider, styled, TextField,} from "@material-ui/core";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {useNetworks} from "../../hooks/api/useNetworks";
import {BaseModal} from "../modals/BaseModal";

const Content = styled(DialogContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Form = styled('form')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
})

type ImportNetworkForm = {
  name: string;
  sharedFile: FileList,
  url: string
};

const FlexRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: "center"
})

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .notRequired()
    .matches(/^[a-zA-Z0-9\-_@#%!&$]*$/),
  sharedFile: yup.mixed(),
  url: yup.string().url()
});

const toPlainText = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});

type P = {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
};

export const ImportNetworkDialog = (p: P) => {
  const { isOpen, onClose, isMobile } = p;
  const {importNetwork, importMojordomo} = useNetworks(),
    {register, errors, handleSubmit, watch} = useForm<ImportNetworkForm>({
      validationSchema,
    });

  const file = watch('sharedFile')

  const onImport = useCallback(
    async (data: ImportNetworkForm) => {
      const sharedFile = data.sharedFile.item(0)
      if (sharedFile) {
        const sharedJSON = await toPlainText(sharedFile)
        importNetwork(sharedJSON, data.name).then(
          (isSuccess) => isSuccess && onClose()
        );
      } else if (data.url) {
        await importMojordomo(data.url)
        onClose()
      }

    },
    [importMojordomo, importNetwork, onClose]
  );

  return (
    <>
      <BaseModal
        keepMounted
        open={isOpen}
        fullScreen={isMobile}
        onClose={onClose}
      >
        <Form onSubmit={handleSubmit(onImport)}>
          <DialogTitle>Import Network</DialogTitle>
          <Content>
            {isOpen && (
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
                <FlexRow>
                  <Box flexGrow={1} p={2} mt={1} mb={1}>
                    <Divider />
                  </Box>
                  <div>or</div>
                  <Box flexGrow={1} p={2} mt={1} mb={1}>
                    <Divider />
                  </Box>
                </FlexRow>
                <TextField
                  name="url"
                  inputRef={register}
                  label="URL"
                  margin='normal'
                  fullWidth
                />
              </>
            )}
          </Content>
          <DialogActions>
            <Button type="submit" color="primary" variant="outlined">
              import
            </Button>
            <Button color="default" variant="outlined" onClick={onClose}>
              cancel
            </Button>
          </DialogActions>
        </Form>
      </BaseModal>
    </>
  );
};
