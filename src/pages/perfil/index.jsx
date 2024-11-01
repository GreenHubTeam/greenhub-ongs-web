import { z } from "zod";
import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { CardPost } from '../../components/cardpost';
import { CardProject } from '../../components/cardproject';
import { zodResolver } from '@hookform/resolvers/zod';
import { Email, Place, Person, LocationCity, Description } from '@mui/icons-material';
import { Box, Grid2, Typography, Container, Tab, Tabs, Button, CircularProgress, TextField, InputAdornment, Divider, Select, InputLabel, MenuItem, FormControl } from "@mui/material";

const postFormSchema = z.object({
    email: z.string().toLowerCase().email('E-mail inválido'),
    description: z.string().min(1, "É obrigatório escrever algo para postar"),
    city: z.string().min(1, "É obrigatório escrever algo para atualizar o perfil"),
    name: z.string().min(1, "É obrigatório escrever algo para atualizar o perfil"),
    state: z.string().min(1, "É obrigatório escrever algo para atualizar o perfil"),
});

export function PerfilPage() {
    const [, setFile] = useState(null);
    const [ongData, setOngData] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [postData, setPostData] = useState([]);
    const { user, setUser, setToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [projectData, setProjectData] = useState({ projects: [] });
    const [profileImage, setProfileImage] = useState();


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: zodResolver(postFormSchema),
    });

    const randomizeProfileImage = () => {
        const profileImages = [
            "/profile1.png",
            "/profile2.png",
            "/profile3.png",
            "/profile4.png",
            "/profile5.png",
        ];
    
        const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
        setProfileImage(randomImage);
    };

    const StatesBrazilList = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
        "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
        "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    async function profileBio() {
        setIsLoading(true);
        try {
            const response = await api.get(`/ong/${user.Ong.id}`);
            setOngData(response.data);
            setValue("email", user.email);
            setValue("name", response.data.name);
            setValue("description", response.data.about);
            setValue("state", response.data.state);
            setValue("city", response.data.city);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao buscar as informações");
        } finally {
            setIsLoading(false);
        }
    };

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


    async function handleEditProfile(data) {
        setLoading(true);

        const body = {
            user: {
                email: data.email,
            },
            ong: {
                name: data.name,
                about: data.description,
                state: data.state,
                city: data.city,
            }
        }

        try {
            const response = await api.put(`/ong/${user.Ong.id}`, body);
            toast.success("Perfil atualizado com sucesso");

            setUser(response.data.user);
            setToken(response.data.token);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao atualizar o perfil");
        } finally {
            setLoading(false);
        }
    };

    async function handleDeletePost() {
        setDeleting(true);
        try {
            await api.delete(`/post/${id}`);

            toast.success("Post deletado com sucesso");
        } catch {
            toast.error("Erro ao deletar o post");
        } finally {
            setDeleting(false);
        }
    }

    async function fetchPost() {
        setIsLoading(true);
        try {
            const response = await api.get(`/post`);
            setPostData(response.data.posts);
        } catch (error) {
            console.log(error)
            toast.error("Erro ao buscar os posts");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
        profileBio();
        fetchProjects();
        randomizeProfileImage();
    }, [user.Ong.id]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                component='img'
                src='/fundoperfil.png'
                alt='imagem de fundo do perfil'
                sx={{
                    width: '100%',
                    height: '280px',
                    margin: '0',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '-90px'
                }}>
                <Box
                    component='img'
                    src={profileImage}
                    alt='Foto de perfil da ONG'
                    onError={() => {
                        setProfileImage("/nomelogo.png"); 
                    }}
                    sx={{
                        height: '150px',
                    }}
                />

                <Typography
                    variant='h3'
                >
                    {ongData.name}
                </Typography>
            </Box>

            <Grid2 container spacing={2}>
                <Grid2 size={4}
                    sx={{
                        padding: '1rem',
                    }}>
                    <Box
                        sx={{
                            border: '1px solid #F0F0F0',
                            height: 'auto',
                            width: '400px',
                            padding: '1rem',
                            borderRadius: '8px',
                        }}>
                        <Typography variant='h5' sx={{ fontWeight: 700, }}>Sobre</Typography>

                        {!isLoading && ongData && (
                            <Box
                                sx={{
                                    borderRadius: '8px',
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                }}
                                id={ongData.id}
                            >
                                <Typography sx={{ marginBottom: '8px', fontWeight: 'bold' }}>{ongData.about}</Typography>

                                <Box display="flex" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Place sx={{ marginRight: '8px' }} />
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {ongData.state} - {ongData.city}
                                    </Typography>
                                </Box>

                                <Box display="flex" >
                                    <Email sx={{ marginRight: '8px' }} />
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {user.email}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>

                </Grid2>

                <Grid2 size={8}>
                    <Tabs value={tabIndex} onChange={handleTabChange} centered>
                        <Tab label="Postagens" />
                        <Tab label="Editar Perfil" />
                        <Tab label="Projetos" />
                    </Tabs>

                    <Box>
                        {tabIndex === 0 && (
                            <Container maxWidth='md'>
                                {!isLoading && postData.length > 0 && (
                                    <Grid2 container spacing={2} sx={{ marginTop: '3rem' }}>
                                        {postData.map((post, index) => (
                                            <Grid2 key={index} size={12}>
                                                <CardPost
                                                    profilePath={post.Ong.imagePath}
                                                    description={post.description}
                                                    postImagePath={post.imagePath}
                                                    createdAt={post.createdAt}
                                                    OngName={post.Ong.name}
                                                    id={post.id}
                                                    onDelete={handleDeletePost}
                                                    showDeleteButton={true}
                                                />
                                            </Grid2>
                                        ))}
                                    </Grid2>
                                )}
                            </Container>
                        )}

                        {tabIndex === 1 && (
                            <Box
                                component='form'
                                onSubmit={handleSubmit(handleEditProfile)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                }}
                            >
                                <TextField
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    {...register("name")}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment
                                                    position="start"
                                                    sx={{ display: 'flex', gap: '0.5rem' }}
                                                >
                                                    <Person />
                                                    <Divider orientation="vertical" flexItem />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    label="Nome da ONG"
                                    fullWidth
                                />

                                <TextField
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    {...register("email")}
                                    required
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment
                                                    position="start"
                                                    sx={{ display: 'flex', gap: '0.5rem' }}
                                                >
                                                    <Email />
                                                    <Divider orientation="vertical" flexItem />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    label="E-mail"
                                    fullWidth
                                />

                                <TextField
                                    error={!!errors.description}
                                    helperText={errors?.description?.message}
                                    {...register("description")}
                                    required
                                    multiline
                                    rows={6}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment
                                                    position="start"
                                                    sx={{ display: 'flex', gap: '0.5rem' }}
                                                >
                                                    <Description />
                                                    <Divider orientation="vertical" flexItem />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    label="Descrição"
                                    fullWidth
                                />

                                <Grid2 container spacing={2}>
                                    <Grid2 xs={6}>
                                        <TextField
                                            error={!!errors.city}
                                            helperText={errors?.city?.message}
                                            {...register("city")}
                                            required
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            sx={{ display: 'flex', gap: '0.5rem' }}
                                                        >
                                                            <LocationCity />
                                                            <Divider orientation="vertical" flexItem />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            label="Cidade"
                                            fullWidth
                                        />
                                    </Grid2>

                                    <Grid2 xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Estado</InputLabel>
                                            <Select
                                                {...register("state")}
                                                error={!!errors.state}
                                                defaultValue=""
                                                sx={{
                                                    width: '100px',
                                                }}
                                            >
                                                {StatesBrazilList.map(state => (
                                                    <MenuItem key={state} value={state}>{state}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid2>

                                </Grid2>

                                <Button
                                    type='submit'
                                    disabled={loading}
                                    variant='contained'
                                    sx={{
                                        backgroundColor: 'green',
                                        color: '#fff',
                                        padding: '1rem',
                                        marginTop: '2rem',
                                        '&:hover': {
                                            backgroundColor: '#22703E',
                                        },
                                    }}
                                >
                                    {loading ? <CircularProgress color="inherit" size={24} /> : 'Salvar'}
                                </Button>
                            </Box>
                        )}

                        {tabIndex === 2 && (
                            <Container maxWidth='md'>
                                {!isLoading && projectData.projects.length > 0 && (
                                    <Grid2 container spacing={2}>
                                        {
                                            projectData.projects.map(
                                                (project) => (
                                                    <Grid2 key={project.id} size={6}>
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
                            </Container>
                        )}
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}
