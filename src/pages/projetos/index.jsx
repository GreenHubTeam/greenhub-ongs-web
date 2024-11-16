import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { CardProject } from '../../components/cardproject';
import { Box, Typography, Button, Grid2, Divider, useMediaQuery, TextField, InputAdornment, Pagination, Skeleton, } from '@mui/material';

const PAGE_SIZE = 6;

export function ProjetosPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const isMobile = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        const fetchProjects = async (data) => {
            setIsLoading(true);
            try {
                const response = await api.get(`/project/ong/${user.Ong.id}`, {
                    params: {
                        search: searchFilter,
                        page: page,
                        pageSize: PAGE_SIZE,
                    },
                });

                setProjectsData(response.data.projects);
                setCount(response.data.count);
            } catch (error) {
                console.log(error);
                toast.error("Erro ao buscar os projetos.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [searchFilter, page, user.Ong.id]);

    return (
        <Box sx={{
            padding: {
                xs: '.5rem',
                md: '2rem'
            },
            display: 'flex',
            flexDirection: 'column',
        }}>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    mb: "3rem",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: "#22703E",
                        fontWeight: "600",
                        marginBottom: isMobile ? "1rem" : "0",
                    }}
                >
                    Projetos
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/create-project")}
                    sx={{
                        backgroundColor: "#22703E",
                        fontSize: isMobile ? "0.875rem" : "1rem",
                        padding: isMobile ? "6px 12px" : "8px 16px",
                        minWidth: isMobile ? "120px" : "150px",
                        marginTop: isMobile ? "12px" : "0",
                    }}
                >
                    Criar Projeto
                </Button>
            </Box>

            <Box mb={3}>
                <TextField
                    fullWidth
                    label="Procure pelo Nome do Projeto"
                    sx={{
                        backgroundColor: "#e7e7e7",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "transparent" },
                            "&:hover fieldset": { borderColor: "transparent" },
                            "&.Mui-focused fieldset": { borderColor: "transparent" },
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                    <Divider orientation="vertical" sx={{ height: 24, mx: 1 }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={(e) => setSearchFilter(e.target.value)}
                />
            </Box>

            <Grid2 container spacing={3}>
                {isLoading
                    ? Array.from([1, 2]).map((_, index) => (
                        <Grid2 key={index}>
                            <Skeleton height={300} variant="rounded" animation="wave" />
                        </Grid2>
                    ))
                    : projectsData.map((project) => (
                        <Grid2 key={project.id} size={{ xs: 12, md: 6 }}>
                            <CardProject
                                name={project.name}
                                description={project.description}
                                id={project.id}
                                imagePath={project.imagePath}
                                status={project.status}
                            />
                        </Grid2>
                    ))}
            </Grid2>

            {projectsData && !isLoading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2rem",
                        marginBottom: "2rem",
                    }}
                >
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
                </Box>
            )}
        </Box>
    )
}