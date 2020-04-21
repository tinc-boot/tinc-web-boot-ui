import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListSubheader,
  TextField,
} from "@material-ui/core";
import { NetworkIListItem } from "./NetworkIListItem";
import { useNetworks } from "../../hooks/api/useNetworks";
import { useHistory } from "react-router-dom";
import { Icon } from "../icon/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {Network} from "../../api/tincweb";

const variants: Variants = {
  visible: {
    maxHeight: [0, 64, 64],
    opacity: [0, 0, 1],
    transition: {
      duration: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    maxHeight: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    maxHeight: [64, 64, 0],
    opacity: [1, 0, 0],
    transition: {
      duration: 0.4,
    },
  },
};

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

export const NetworkList = () => {
  const { networks, loadNetworks, createNetwork } = useNetworks(),
    [isNew, setNew] = useState(false),
    history = useHistory();

  const { register, errors, handleSubmit } = useForm<AddNetworkForm>({
    validationSchema,
  });

  const onClick = useCallback(
    (n: Network) => () => {
      history.push("/app/networks/" + n.name);
    },
    [history]
  );

  const onSubmit = useCallback(
    (data: AddNetworkForm) => {
      createNetwork(data.name).finally(() => setNew(false));
    },
    [createNetwork]
  );

  useEffect(() => {
    loadNetworks();
  }, [loadNetworks]);

  return (
    <>
      {networks && (
        <List subheader={<ListSubheader>Networks</ListSubheader>}>
          <AnimatePresence>
            {networks?.map((n) => (
              <NetworkIListItem
                key={"network-" + n.name}
                network={n}
                onClick={onClick(n)}
              />
            ))}
          </AnimatePresence>
        </List>
      )}
      <Divider />
      <AnimatePresence>
        {isNew && (
          <motion.div
            variants={variants}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            <Box overflow="hidden" height="100%">
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  inputRef={register}
                  autoFocus
                  margin="dense"
                  label="Networks name"
                  name="name"
                  error={!!errors.name}
                  helperText={
                    errors?.name?.message || "enter name for new network"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          color="primary"
                          aria-label="add"
                        >
                          <Icon icon="faCheck" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  color="secondary"
                  onClick={() => setNew(false)}
                >
                  cancel
                </Button>
              </form>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isNew && (
          <motion.div
            variants={variants}
            animate="visible"
            initial="hidden"
            exit="exit"
          >
            <Box overflow="hidden" height="100%">
              <Button fullWidth color="primary" onClick={() => setNew(true)}>
                add
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
