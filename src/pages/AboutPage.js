import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
// @mui
import {
  Card,
  CardContent,
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import Swal from 'sweetalert2'

// ----------------------------------------------------------------------


export default function AboutPage() {

  return (
    <>
        <Helmet>
            <title> About Page | TA RPLBK Kel 29 </title>
        </Helmet>

        <Container>
            <Card>
                <CardContent>
                    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h5" gutterBottom>
                            Programming Quotes App by Kelompok 29
                        </Typography>
                        <Typography gutterBottom>
                            Programming Quotes App is using <a target='_blank' rel="noreferrer" href='https://programming-quotes-api.herokuapp.com/index.html'>ProgrammingQuotesApi</a> as API source
                        </Typography>
                    </Container>
                </CardContent>
            </Card>
        </Container>
    </>
  );
}
