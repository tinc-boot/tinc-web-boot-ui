import React, {useCallback} from "react";
import {Button, DialogActions, DialogContent, styled, TextField,} from "@material-ui/core";
import * as yup from "yup";
import {useNetworks} from "../../hooks/api/useNetworks";
import {useForm} from "react-hook-form";
import {BaseModal} from "../modals/BaseModal";

const Content = styled(DialogContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

type AddNetworkForm = {
  name: string;
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z0-9\-_@#%!&$]*$/)
    .min(3)
    .max(16),
});

type P = {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
};

export const AddNetworkModal = (p: P) => {
  const { isOpen, onClose, isMobile } = p;
  const { createNetwork } = useNetworks(),
    { register, errors, handleSubmit } = useForm<AddNetworkForm>({
      validationSchema,
    });

  const onSubmit = useCallback(
    (data: AddNetworkForm) => {
      createNetwork(data.name).finally(() => onClose());
    },
    [createNetwork, onClose]
  );

  return (
    <>
      <BaseModal
        fullScreen={isMobile}
        open={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Content>
          <TextField
            fullWidth
            inputRef={register}
            autoFocus
            margin="dense"
            label="Networks name"
            name="name"
            error={!!errors.name}
            helperText={errors?.name?.message || "enter name for new network"}
          />
        </Content>
        <DialogActions>
          <Button color="secondary" onClick={onClose}>
            cancel
          </Button>
          <Button color="primary" type="submit">
            submit
          </Button>
        </DialogActions>
      </BaseModal>
    </>
  );
};
