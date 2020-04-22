import React, {useCallback, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {listItemHeight} from "../../motions/variants/list-item-height";
import {Box, Button, IconButton, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Icon} from "../icon/Icon";
import {useNetworks} from "../../hooks/api/useNetworks";
import {useForm} from "react-hook-form";
import * as yup from "yup";

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

export const AddNetworkForm = () => {
  const { createNetwork } = useNetworks(),
    [isNew, setNew] = useState(false),
    { register, errors, handleSubmit } = useForm<AddNetworkForm>({validationSchema});

  const onSubmit = useCallback(
    (data: AddNetworkForm) => {
      createNetwork(data.name).finally(() => setNew(false));
    },
    [createNetwork]
  );

  return (
    <>
      <AnimatePresence>
        {isNew && (
          <motion.div
            variants={listItemHeight}
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
            variants={listItemHeight}
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
