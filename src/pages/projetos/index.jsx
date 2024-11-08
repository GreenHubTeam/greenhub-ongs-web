import { api } from "../../libs/axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { CardProject } from '../../components/cardproject';
import { Box, Typography, Button, Grid2, CircularProgress, useMediaQuery } from '@mui/material';
import { toast } from "react-toastify";


export function ProjetosPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [projectData, setProjectData] = useState({ projects: [] });

    async function fetchProjects() {
        setIsLoading(true);
        try {
            const response = await api.get(`/project/ong/${user.Ong.id}`);
            setProjectData({ projects: response.data.projects || [] });
        } catch {
            toast.error("Error ao buscar os projetos")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [user.Ong.id]);

    return (
        <Box sx={{
            padding: {isMobile} ? '1rem' : '2rem',
            display: 'flex',
            flexDirection: 'column',
        }}>

           <Box
           sx={{
               display: 'flex',
               flexDirection: isMobile ? 'column' : 'row',  
               alignItems: 'flex-start',
               justifyContent: 'space-between', 
               mb: '3rem',
           }}
       >
           <Typography
               variant='h3'
               sx={{
                   color: '#22703E',
                   fontWeight: '600',
                   marginBottom: isMobile ? '1rem' : '0',  
               }}
           >
               Projetos
           </Typography>
       
           <Button
               variant='contained'
               onClick={() => navigate('/create-project')}
               sx={{
                   backgroundColor: '#22703E',
                   fontSize: isMobile ? '0.875rem' : '1rem', 
                   padding: isMobile ? '6px 12px' : '8px 16px', 
                   minWidth: isMobile ? '120px' : '150px',
                   marginTop: isMobile ? '12px' : '0', 
                                }}
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

            {!isLoading && projectData.projects.length > 0 && ( 
                <Grid2 container spacing={2}>
                    {
                        projectData.projects.map( 
                            (project) => (
                                <Grid2 key={project.id} size={{ xs: 12, md: 6}}>
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

            {!isLoading && projectData.projects.length <= 0 && ( 
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