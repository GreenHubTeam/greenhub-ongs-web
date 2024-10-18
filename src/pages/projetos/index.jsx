import { api } from "../../libs/axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { CardProject } from '../../components/cardproject';
import { Box, Typography, Button, Grid2, CircularProgress } from '@mui/material';
import { toast } from "react-toastify";


export function ProjetosPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [projectData, setProjectData] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
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

        fetchProjects();
    }, [user.Ong.id]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem'
        }}>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: '3rem'
                }}
            >
                <Typography variant='h3' sx={{
                    color: '#22703E',
                    fontWeight: '600'
                }}>
                    Projetos
                </Typography>

                <Button
                    variant='contained'
                    onClick={() => navigate('/create-project')}
                    sx={{ backgroundColor: '#22703E' }}
                >
                    Criar Projeto
                </Button>
            </Box>

            {isLoading && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px'
                    }}
                >
                    <CircularProgress color="success" />
                </Box>
            )}

            {!isLoading && projectData.length > 0 && (
                <Grid2 container spacing={2}>
                    {
                        projectData.map(
                            (project, index) => (
                                <Grid2 key={index} size={6}>
                                    <CardProject
                                        name={project.name}
                                        description={project.description}
                                        imagePath={project.imagePath}
                                        status={project.status}
                                        id={project.id}
                                    />
                                </Grid2>
                            )
                        )
                    }
                </Grid2>
            )}

            {!isLoading && projectData.length <= 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px'
                    }}
                >
                    <Typography>
                        Nenhum Projeto encontrado!
                    </Typography>
                </Box>
            )}
        </Box>
    )
}