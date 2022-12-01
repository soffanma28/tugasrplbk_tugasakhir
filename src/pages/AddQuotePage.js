import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
// @mui
import {
  Card,
  Stack,
  Container,
  Typography,
  TextField,
  CardContent,
  Button
} from '@mui/material';
import Swal from 'sweetalert2'

// ----------------------------------------------------------------------


export default function AddQuotePage() {
  const BASE_API_URL = `https://programming-quotes-api.herokuapp.com`;

  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");

  const handleSubmit = () => {
    axios
      .post(`${BASE_API_URL}/Quotes`, {
        id: "string",
        author,
        en: quote,
      })
      .then((res) => {
        // setUsers([...users, res.data]);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Quotes added',
          target: 'body',
        });
        console.log(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.errors.En[0],
          target: 'body',
        });
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Add Quotes | TA RPLBK Kel 29 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Quotes
          </Typography>
        </Stack>

        <Card>
          <CardContent style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem 4rem"
          }}>
            <TextField 
              fullWidth 
              id="filled-basic" 
              label="Author" 
              variant="filled" 
              name='author'
              onChange={(event) => setAuthor(event.target.value)}
            />
            <TextField 
              fullWidth 
              id="filled-basic" 
              label="Quotes" 
              variant="filled" 
              name='en'
              onChange={(event) => setQuote(event.target.value)}
            />

            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
