import { CardProject} from '../../components/cardproject'
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { api } from "../../libs/axios";


export function ProjetosPage() {
    const navigate = useNavigate();
    const [project, setProject] = useState([]);

    const { user } = useAuth();

    const fetchProjects = async () => {
        try {
            const response = await api.get(`/project/ong/${user.Ong.Id}`);
            console.log("Projetos recebidos:", response.data);
            setProject(response.data);
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

            <>
                {
                    project.map(
                        (project) => (
                            <CardProject
                                name={project.name}
                                description={project.description}
                                imagePath={project.imagePath}
                                status={project.status}
                            />
                        )
                    )
                }
            </>
        </Box>
    )
}