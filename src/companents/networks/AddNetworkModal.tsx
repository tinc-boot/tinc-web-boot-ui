import React, { useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  styled,
  TextField,
} from "@material-ui/core";
import * as yup from "yup";
import { useNetworks } from "../../hooks/api/useNetworks";
import { useForm } from "react-hook-form";
import { TransitionProps } from "@material-ui/core/transitions";

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
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
      <Dialog
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        open={isOpen}
        onClose={onClose}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
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
        </Form>
      </Dialog>
    </>
  );
};
