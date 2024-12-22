import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Link,
  Box,
  CssBaseline,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          overflowX: 'hidden',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX:'hidden'}}>
        <AppBar position="static">
          <Toolbar>
            <TaskAltIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TaskMaster
            </Typography>
            <Button color="inherit" >Features</Button>
            <Button color="inherit" href="#about">About</Button>
            <Button color="inherit" href="/login">Log In</Button>
            <Button color="inherit" href="/register">Sign Up</Button>
          </Toolbar>
        </AppBar>

        <Container component="main" sx={{ mt: 8, mb: 2, flexGrow: 1 }} maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Manage Your Tasks with Ease
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
            TaskMaster helps you organize, track, and complete your tasks efficiently.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" href='/login' size="large">
              Login
            </Button>
          </Box>

          <Box id="features" sx={{ mt: 8 }}>
            <Typography variant="h4" component="h3" gutterBottom align="center" sx={{ mb: 4 }}>
              Features
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <FormatListBulletedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                      Task Organization
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Keep your tasks organized with custom lists and categories.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <CalendarTodayIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                      Due Dates
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Set due dates and reminders to stay on top of your tasks.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                      Progress Tracking
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track your progress and celebrate your accomplishments.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box id="about" sx={{ mt: 8 }}>
            <Typography variant="h4" component="h3" gutterBottom align="center" sx={{ mb: 4 }}>
              About TaskMaster
            </Typography>
            <Typography variant="body1" paragraph>
              TaskMaster is a powerful task management application designed to help individuals <to></to> stay organized and productive. Our intuitive interface and robust features make it easy to create, manage, and complete tasks efficiently.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're a busy professional, a student, or anyone looking to improve their productivity, TaskMaster has the tools you need to succeed. Start your journey to better task management today!
            </Typography>
          </Box>
        </Container>

        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'black' }}>
          <Container maxWidth="sm">
            <Typography variant="body2" color="white" align="center">
              © {new Date().getFullYear()} TaskMaster. All rights reserved.
            </Typography>
            <Typography variant="body2" color="white" align="center">
              <Link href="#" color="inherit" sx={{ mx: 1 }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" sx={{ mx: 1 }}>
                Terms of Service
              </Link>
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

