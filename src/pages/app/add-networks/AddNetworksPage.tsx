import React from "react"
import {LinearProgressFixed} from "../AppPage";
import {useNetworks} from "../../../hooks/api/useNetworks";
import {Box, Container, Paper, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";

type AddNetworksForm = {

}

export const AddNetworksPage = () => {
  const {fetching} = useNetworks();
  const {} = useForm({})

  return (
    <>
      {fetching && <LinearProgressFixed color="secondary"/>}
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
