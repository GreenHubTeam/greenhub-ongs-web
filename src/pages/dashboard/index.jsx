import { api } from "../../libs/axios";
import { useEffect, useState } from "react";
import { Person } from "@mui/icons-material";
import GroupIcon from '@mui/icons-material/Group';
import { PieChart } from '@mui/x-charts/PieChart';
import { useAuth } from "../../context/authContext";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Badge, Box, Grid2, Paper, Skeleton, Typography, Select } from "@mui/material";

export function DashboardPage() {
    const [userData, setUserData] = useState([]);
    const [project, setProject] = useState('');


    const { user } = useAuth();

    const handleChange = (event) => {
        setProject(event.target.value);
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/user/${user.id}`);
            setUserData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await api.get(`/user/profile-image/${user.id}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Erro a foto de perfil:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProfile();
    }, []);

    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2 size={8} sx={{ padding: '0rem' }}>
                    <Box
                        component="div"
                        sx={{
                            position: 'relative',
                            height: '300px',
                            display: 'flex',
                            marginBottom: '1rem',
                            alignItems: 'center',
                            color: 'white',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: '1',
                            },
                        }}
                    >

                        <Box
                            component='img'
                            src='/pesovero.png'
                            alt="Banner"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: '0',
                                borderRadius: '1rem'
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                zIndex: '2',
                                padding: '0 2rem',
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                                Seja bem-vindo ao Greenhub!
                            </Typography>
                            <Typography >
                                Aqui você poderá gerenciar e acompanhar todas as doações e o progresso dos seus projetos sustentáveis.
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>

                <Grid2 size={4} sx={{ padding: '0 2rem' }}>
                    <Box
                        component="div"
                        sx={{
                            position: 'relative',
                            height: '300px',
                            display: 'flex',
                            marginBottom: '1rem',
                            alignItems: 'center',
                            color: 'white',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: '1',
                            },
                        }}
                    >

                        <Box
                            component='img'
                            src='/docas.png'
                            alt="Banner"
                            sx={{
                                objectFit: 'cover',
                                zIndex: '0',
                                borderRadius: '1rem',
                                width: '100%',
                                height: '100%',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                zIndex: '2',
                                padding: '0 2rem',
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                                Faça a diferença!
                            </Typography>
                            <Typography >
                                Seu apoio é essencial para um futuro mais sustentável.
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>
            </Grid2>

            <Box
                variant='div'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem',
                }}
            >
                <FormControl sx={{ m: 1, width: '200px' }} size="small">
                    <InputLabel id="demo-select-small-label">projetos</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={project}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid2 container spacing={4}>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '12px'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Quantidade de doações
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: '1'
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                40
                            </Typography>

                            <GroupIcon
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2 >

                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '12px'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total das Doações
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: '1'
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                6.000
                            </Typography>

                            <GroupIcon
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2 >

                <Grid2 size={4} sx={{ padding: '0 2rem ' }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '12px'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Usuários que visualizaram
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: '1'
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                1.000
                            </Typography>

                            <GroupIcon
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2 >
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2 size={8} sx={{ padding: '0' }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '12px',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold', margin: '1rem', justifyContent: 'flex-start', }}>
                            Total de Usuarios
                        </Typography>

                        <Box
                            sx={{
                                width: '100%',
                                height: '375px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '1rem'
                            }}
                        >
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, color: '#0f4522' },
                                            { id: 1, value: 15, color: '#1da03a' },
                                            { id: 2, value: 20, color: '#59c065' },
                                        ],
                                    },
                                ]}
                                width={350}
                                height={350}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#0f4522',
                                    margin: '0.8rem',
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                visualização
                            </Typography>

                            <Box
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#1da03a',
                                    margin: '0.8rem',
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                Total das doações
                            </Typography>

                            <Box
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: '#59c065',
                                    margin: '0.8rem',
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                doadores
                            </Typography>
                        </Box>
                    </Paper>
                </Grid2>

                <Grid2 size={4} sx={{ padding: '0 2rem' }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '2rem',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <RemoveRedEyeIcon sx={{ marginRight: '1rem' }} />
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    Top Visualizações
                                </Typography>
                            </Box>

                            {[
                                { users: 40, name: "Ricardo Juarez" },
                                { users: 37, name: "Rodrigo Marques" },
                                { users: 17, name: "Marília Mendonça" },
                                { users: 12, name: "Roberto Carlos" }
                            ].map((user, index) => (
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '3rem',
                                }} key={index}>
                                    <Typography sx={{ margin: '0.5rem', fontSize: '30px', fontWeight: 'bold' }}>
                                        {user.users}
                                    </Typography>
                                    <img
                                        src="/perfilong.png"
                                        alt="Foto de perfil"
                                        style={{ width: '65px', height: '65px', borderRadius: '50%', marginRight: '0.5rem' }}
                                    />
                                    <Typography sx={{ marginLeft: '0.5rem', fontSize: '20px', fontWeight: 'bold' }}>
                                        {user.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    );
};