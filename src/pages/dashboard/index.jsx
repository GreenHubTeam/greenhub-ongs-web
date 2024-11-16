import { api } from "../../libs/axios";
import { env } from '../../env/index';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import InputLabel from '@mui/material/InputLabel';
import { useAuth } from "../../context/authContext";
import FormControl from '@mui/material/FormControl';
import { MonetizationOn, Group, VolunteerActivism } from '@mui/icons-material';
import { Badge, Box, Grid2, Paper, Skeleton, Typography, Select, Avatar, MenuItem, Stack, Pagination } from "@mui/material";

const PAGE_SIZE = 6;

export function DashboardPage() {
    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [project, setProject] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statistics, setStatistics] = useState(null);
    const [projectData, setProjectData] = useState([]);

    const getRandomProfileImage = () => {
        const profileImages = [
            "/profile1.png",
            "/profile2.png",
            "/profile3.png",
            "/profile4.png",
            "/profile5.png",
            "/profile6.png"
        ];
        const randomIndex = Math.floor(Math.random() * profileImages.length);
        return profileImages[randomIndex];
    };

    const CustomAvatar = ({ imagePath, name }) => {
        const [avatarSrc, setAvatarSrc] = useState(`${env.api_url}/${imagePath}`);

        return (
            <Avatar
                src={avatarSrc}
                alt={name}
                onError={() => setAvatarSrc(getRandomProfileImage())}
                sx={{ cursor: 'pointer' }}
            />
        );
    };
    const fetchStatistics = async (projectId) => {
        setLoading(true);
        try {
            const response = await api.get(`/dashboard/ong/${projectId}`);
            setStatistics(response.data);
        } catch {
            toast.error("Erro ao buscar as estatísticas do projeto");
        } finally {
            setLoading(false);
        }
    };

    async function fetchSelectProjects() {
        setIsLoading(true);
        try {
            const response = await api.get(`/dashboard/projects/ong/${user.Ong.id}`, {
                params: {
                    page: page,
                    pageSize: PAGE_SIZE,
                },
            });
            setProjectData(response.data);
            setCount(Number(response.data.count) || 1); 

            if (response.data.length > 0) {
                setProject(response.data[0].id);
                fetchStatistics(response.data[0].id);
            }
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
            toast.error("Erro ao buscar os projetos");
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchProjects() {
        setIsLoading(true);
        try {
            const response = await api.get(`/project/ong/${user.Ong.id}`);
            setProjectData(response.data.projects);

            if (response.data.projects.length > 0) {
                setProject(response.data.projects[0].id);
                fetchStatistics(response.data.projects[0].id);
            }
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
            toast.error("Erro ao buscar os projetos");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProjects();
        fetchSelectProjects();
    }, [user?.Ong?.id]);

    const handleChange = (event) => {
        const selectedProject = event.target.value;
        setProject(selectedProject);
        fetchStatistics(selectedProject);
    };

    return (
        <Grid2 container spacing={2}>

            <Grid2 size={{ xs: 12, md: 8 }}>
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

            <Grid2 size={{ xs: 12, md: 4 }}>
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

            <Grid2 size={12} container justifyContent='end'>
                <FormControl sx={{ width: '100%', maxWidth: '300px' }}>
                    <InputLabel id="select-project-label">Projetos</InputLabel>
                    <Select
                        labelId="select-project-label"
                        id="select-project"
                        value={project}
                        label="Projeto"
                        onChange={handleChange}
                        disabled={isLoading}
                        size="medium"
                    >
                        {Array.isArray(projectData) && projectData.map((project) => (
                            <MenuItem key={project.id} value={project.id}>
                                {project.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>

            <Grid2 size={12} container spacing={2}>
                <Grid2 size={{ xs: 12, md: 4 }}  >
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

                            <VolunteerActivism
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2 >

                <Grid2 size={{ xs: 12, md: 4 }}>
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

                            <MonetizationOn
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2 >

                <Grid2 size={{ xs: 12, md: 4 }}>
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

                            <Group
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2 >
            </Grid2>

            <Grid2 size={12} container spacing={2} alignItems='stretch'>
                <Grid2 size={{ xs: 12, md: 8 }} >
                    <Paper
                        variant="outlined"
                        sx={{
                            width: '100%',
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
                                series={[
                                    {
                                        data: statistics?.dadosGrafico?.sort((a, b) => {
                                            if (a.id === 0) return -1;
                                            if (b.id === 0) return 1;
                                            if (a.id === 1) return -1;
                                            if (b.id === 1) return 1;
                                            return 0;
                                        }) || []
                                    }
                                ]}
                                width={350}
                                height={350}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                marginBottom: '1rem',
                                justifyContent: 'center',
                                flexDirection: { xs: 'column', sm: 'row' },
                            }}
                        >
                            {statistics?.dadosGrafico?.map((dado, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', margin: '0.8rem' }}>
                                    <Box sx={{ width: '20px', height: '20px', backgroundColor: dado.color, marginRight: '0.5rem' }} />
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        {dado.id === 0 ? 'Doações' : dado.id === 1 ? 'Visualizações' : 'Total das Doações'}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{
                            width: '100%',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Top Visualizações
                                </Typography>
                            </Box>

                            <Stack spacing={2} sx={{ marginTop: '1rem' }}>
                                {statistics?.topVisualizadores?.slice(0, 5).map((user, index) => (
                                    <Stack direction='row' spacing={1} alignItems='center' key={index} justifyContent='space-between'>
                                        <CustomAvatar
                                            imagePath={user.imagePath}
                                            name={user.name}
                                        />

                                        <Stack flexGrow={1}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }} noWrap>
                                                {user.nome}
                                            </Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: '.7rem' }} noWrap>
                                                {user.email}
                                            </Typography>
                                        </Stack>

                                        <Badge
                                            sx={{ marginLeft: '1rem' }}
                                            badgeContent={user.visualizacoes || 0}
                                            color="success"
                                        />
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>
            <Grid2 size={12} container justifyContent="center" sx={{ marginTop: '1rem' }}>
                <Pagination
                    count={Math.ceil(count / PAGE_SIZE)} 
                    page={page}
                    onChange={(_, value) => {
                        setPage(value);
                    }}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#22703E",  
                            borderRadius: "50%",  
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#22703E",  
                            color: "#fff",  
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "#d3e7d3", 
                        },
                    }}
                />
            </Grid2>
        </Grid2 >
    );
}