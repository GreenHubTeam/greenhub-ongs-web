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
    const [error, setError] = useState(null);
    const [project, setProject] = useState('');
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statistics, setStatistics] = useState(null);
    const [projectData, setProjectData] = useState([]);

    const { user } = useAuth();

    const handleChange = (event) => {
        setProject(event.target.value);
        fetchStatistics(event.target.value);
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/user/${user.id}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
        }
    };

    async function fetchProjects() {
        setIsLoading(true);
        try {
            const response = await api.get(`/project/ong/${user.Ong.id}`);
            setProjectData(response.data);
        } catch {
            toast.error("Error ao buscar os projetos")
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStatistics = async (projectId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/dashboard/ong/${projectId}`);
            setStatistics(response.data);
        } catch (error) {
            setError("Erro ao buscar as estatísticas do projeto");
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProjects();
    }, []);

    return (
        <Box>
             <Grid2 container spacing={2}>
                <Grid2 size={8} sx={{ padding: '2rem' }}>
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
                                padding: '2rem',
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

                <Grid2 size={4} sx={{ padding: '2rem' }}>
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
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    padding: '0 2rem',
                    marginBottom: '1rem',
                }}
            >
                <FormControl sx={{ m: 1, width: '200px' }} size="small">
                    <InputLabel id="select-project-label">Projetos</InputLabel>
                    <Select
                        labelId="select-project-label"
                        id="select-project"
                        value={project}
                        label="Projeto"
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        <MenuItem value="">
                            <em>Nenhum</em>
                        </MenuItem>
                        {Array.isArray(projectData) && projectData.map((project) => (
                            <MenuItem key={project.id} value={project.id}>
                                {project.name} 
                            </MenuItem>
                        ))}
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
                                {loading ? <Skeleton width={50} /> : statistics?.totalDoacoes || 0}
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
                                {loading ? <Skeleton width={50} /> : `R$ ${statistics?.totalDoado || 0}`}
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
                                {loading ? <Skeleton width={50} /> : statistics?.totalVisualizacoes || 0}
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
                            Total de Usuários
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
                                series={[{ data: statistics?.dadosGrafico || [] }]}
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
                            {statistics?.dadosGrafico?.map((dado, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', margin: '0.8rem' }}>
                                    <Box sx={{ width: '20px', height: '20px', backgroundColor: dado.color, marginRight: '0.5rem' }} />
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        {dado.id === 0 ? 'Visualizações' : dado.id === 1 ? 'Total das Doações' : 'Doações'}
                                    </Typography>
                                </Box>
                            ))}
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <RemoveRedEyeIcon sx={{ marginRight: '0.5rem' }} />
                                <Typography>Visualizações:</Typography>
                                <Badge
                                    sx={{ marginLeft: '0.5rem' }}
                                    badgeContent={statistics?.totalVisualizacoes || 0}
                                    color="success"
                                />
                            </Box>

                            <Box sx={{ marginTop: '1rem' }}>
                                {statistics?.topVisualizadores?.map((user, index) => (
                                    <Typography key={index} sx={{ fontSize: '1rem' }}>
                                        {user.nome} - {user.qtdVisualizacoes} visualizações
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box >
    );
}
