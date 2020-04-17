import React, {useCallback, useEffect, useState} from "react";
import {
  Box, Button,
  Container,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  List,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { NetworkIListItem } from "./NetworkIListItem";
import { CustomFab } from "../../../companents/buttons/CustomFab";
import { Icon } from "../../../companents/icon/Icon";
import { useNetworks } from "../../../hooks/api/useNetworks";
import { LinearProgressFixed } from "../AppPage";
import {useForm} from "react-hook-form";
import * as yup from 'yup'

type AddNetworkForm = {
  name: string
}

const validationSchema = yup.object().shape({
  name: yup.string().required().min(3).max(16)
})

export const NetworksPage = () => {
  const { networks, loadNetworks, createNetwork, fetching } = useNetworks(),
    [open, setOpen] = useState(false);
  const {register, errors, handleSubmit} = useForm<AddNetworkForm>({validationSchema});

  const onSubmit=useCallback((data: AddNetworkForm) => {
    createNetwork(data.name).finally(() => setOpen(false));
  }, [createNetwork])

  useEffect(() => {
    loadNetworks()
      .catch(console.error);
  }, [loadNetworks]);

  return (
    <>
      {fetching && <LinearProgressFixed color="secondary" />}
      <Container maxWidth="md">
        <Typography color="textPrimary" variant="h1">
          Networks
        </Typography>
        <Box mt={3}>
          <Paper elevation={2}>
            {networks && (
              <List>
                {networks?.map((n) => (
                  <NetworkIListItem key={"network-" + n.name} network={n} />
                ))}
              </List>
            )}
          </Paper>
          <CustomFab color="primary" onClick={() => setOpen(true)}>
            <Icon icon="faPlus" />
          </CustomFab>
        </Box>
      </Container>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Network</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box minWidth={360}/>
            <TextField
              fullWidth
              inputRef={register}
              name='name'
              label='Name network'
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
        </DialogContent>
          <DialogActions>
            <Button type='submit' variant='contained' color='primary'>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
