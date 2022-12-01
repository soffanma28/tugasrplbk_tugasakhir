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
    </>
  );
}
