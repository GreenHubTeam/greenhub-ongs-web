import { CardProject } from '../../components/cardproject'
import { Box, Typography, Button, Grid2 } from '@mui/material';
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { api } from "../../libs/axios";


export function ProjetosPage() {
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState([]);

    const { user } = useAuth();

    const fetchProjects = async () => {
        try {
            const response = await api.get(`/project/ong/${user.Ong.id}`);
            setProjectData(response.data);
        } catch (error) {
            console.error("Erro ao buscar os projetos:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

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
                }}>
                    Projetos
                </Typography>

                <Button
                    variant='contained'
                    onClick={() => navigate('/criacao')}
                    sx={{ backgroundColor: '#22703E' }}
                >
                    Criar Projeto
                </Button>
            </Box>

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
        </Box>
    )
}