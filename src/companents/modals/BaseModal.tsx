import React, {FormEventHandler} from 'react';
import {TransitionProps} from "@material-ui/core/transitions";
import {Dialog, DialogProps, Slide, styled} from "@material-ui/core";

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

export type BaseModalProps = DialogProps & {
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export const BaseModal = ({children, onSubmit, ...p}: BaseModalProps) => {
  return (
    <Dialog
      {...p}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
    >
      <Form onSubmit={onSubmit}>
        {children}
      </Form>
    </Dialog>
  );
};
