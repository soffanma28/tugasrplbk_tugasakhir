import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { 
  Grid, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Paper, 
} from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | TA RPLBK Kel 29 </title>
      </Helmet>

      <Container maxWidth="xl">
        <Card>
          <CardContent>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Programming Quotes App by Kelompok 29
              </Typography>
            </Container>

            <Grid container spacing={3}>
              <Grid item sm="12" md="4" lg="4">
                <Paper
                  elevation={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Soffan Marsus Ahmad
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    21120119130042
                  </Typography>
                </Paper>
              </Grid>
              <Grid item sm="12" md="4" lg="4">
                <Paper
                  elevation={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Rizaldy Imam Khadafi
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    21120119140119
                  </Typography>
                </Paper>
              </Grid>
              <Grid item sm="12" md="4" lg="4">
                <Paper
                  elevation={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Kevin Ryo Pratama
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    21120119130098
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
