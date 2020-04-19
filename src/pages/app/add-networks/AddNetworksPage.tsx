import React from "react"
import {useNetworks} from "../../../hooks/api/useNetworks";
import {Box, Container, Paper, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";

type AddNetworksForm = {

}

export const AddNetworksPage = () => {
  return (
    <>
      <Container maxWidth="md">
        <Typography color="textPrimary" variant="h1">
          Networks
        </Typography>
        <Box mt={3}>
          <Paper elevation={2}>

          </Paper>
        </Box>
      </Container>
    </>
  )
}
