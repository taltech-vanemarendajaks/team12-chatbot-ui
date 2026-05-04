import { useEffect, useState } from 'react';
import {
    Box,
    CircularProgress, Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import { userApi } from '../api/userApi';
import type { User } from '../types/user.types';
import Alert from '@mui/material/Alert';
import { PieChart } from '@mui/x-charts/PieChart';

const settings = {
    margin: { right: 4 },
    width: 400,
    height: 400,
    hideLegend: false,
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try{
                setLoading(true);
                setError(null);

                const data = await userApi.getAllUsers();
                setUsers(data);
            } catch (err){
                console.error("Error loading users", err);
                setError("Kasutajate laadimine ebaõnnestus");
            }
            finally {
                setLoading(false);
            }
        };
        void loadUsers();
    },[]);

    const roleCounts = users.reduce(
      (acc, user) => {
          acc[user.roleName] = (acc[user.roleName] || 0) + 1;
          return acc;
      },
      {} as Record<string, number>,
    );

    const data = Object.entries(roleCounts).map(([role, count], index) => ({
        id: index,
        label: role,
        value: count,
        color: ['#FF8042', '#0088FE', '#FFBB28', '#00C49F'][index % 4],
    }));

    if(loading) {
        return(
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <CircularProgress />
          </Box>
        );
    }

    return (
      <Box>
          <Paper
            elevation={0}
            sx={{
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
          >
              <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    px: 3,
                    py: 2.5,
                }}
              >
                  <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
                      Kasutajad
                  </Typography>
                  <Typography variant="body1" color="white">
                      Süsteemi kasutajad ja nende rollid
                  </Typography>
              </Box>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
              )}
              <Box sx={{ p: 3, bgcolor: "background.default" }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid size={6}>
                      <TableContainer component={Paper}>
                          <Table sx={{ tableLayout: 'auto' }} aria-label="customized table">
                              <TableHead>
                                  <TableRow>
                                      <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Nr</TableCell>
                                      <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Name</TableCell>
                                      <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Roll</TableCell>
                                      <TableCell sx={{ color: 'text.secondary', fontWeight: 'bold' }}>Id</TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            Kasutajaid ei leitud
                                        </TableCell>
                                    </TableRow>
                                  ) : (
                                    users.map((user, index) => (
                                      <TableRow key={user.id}>
                                          <TableCell
                                            sx={{
                                                color: 'text.primary',
                                                padding: { xs: '8px 4px', sm: '10px' },
                                            }}
                                          >
                                              {index + 1}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                                color: 'text.primary',
                                                padding: { xs: '8px 4px', sm: '10px' },
                                            }}
                                          >
                                              {user.name}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                                color: 'text.primary',
                                                padding: { xs: '8px 4px', sm: '10px' },
                                            }}
                                          >
                                              {user.roleName}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                                color: 'text.primary',
                                                padding: { xs: '8px 4px', sm: '10px' },
                                            }}
                                          >
                                              {user.id}
                                          </TableCell>
                                      </TableRow>
                                    ))
                                  )}
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </Grid>
                  <Grid size={6} display={'flex'}>
                      <PieChart
                        series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
                        {...settings}
                      />
                  </Grid>
              </Grid>
              </Box>
          </Paper>
      </Box>
    );
}