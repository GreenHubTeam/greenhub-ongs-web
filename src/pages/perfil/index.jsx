import { z } from "zod";
import { env } from "../../env/index";
import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { CardPost } from '../../components/cardpost';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardProject } from '../../components/cardproject';
import { Email, Place, Person, LocationCity, Description, PhotoCamera } from '@mui/icons-material';
import { Box, Grid2, Typography, Container, Tab, Tabs, Button, CircularProgress, TextField, InputAdornment, Divider, Select, InputLabel, MenuItem, FormControl, useMediaQuery, Stack, Avatar, Badge, IconButton } from "@mui/material";

const postFormSchema = z.object({
    email: z.string().toLowerCase().email('E-mail inválido'),
    description: z.string().min(1, "É obrigatório escrever algo para postar"),
    city: z.string().min(1, "É obrigatório escrever algo para atualizar o perfil"),
    name: z.string().min(1, "É obrigatório escrever algo para atualizar o perfil"),
    state: z.string().min(1, "É obrigatório escrever algo para atualizar o perfil"),
});

export function PerfilPage() {
    const [ongData, setOngData] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [postData, setPostData] = useState([]);
    const { user, setUser, setToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState();
    const isMobile = useMediaQuery('(max-width:768px)');
    const [projectData, setProjectData] = useState({ projects: [] });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(postFormSchema),
    });



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

    async function fetchPost() {
        setIsLoading(true);
        try {
            const response = await api.get(`/post/ong/${user.Ong.id}`);
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
    }, [user.Ong.id]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleFileChange = async (event) => {
        const file = (event.target).files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile-image', file);

            setIsLoading(true);

            try {
                const { data } = await api.put(`/ong/profile-image/${user.Ong.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setProfileImage(`${env.api_url}/${data.user.imagePath}`);

                toast.success("Foto de perfil atualizada com sucesso");
            } catch (error){
                console.log(error);
                toast.error("Erro ao mudar foto de perfil");
            } finally {
                setIsLoading(false);
            }
        }
    };

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    my: '1rem'
                }}
            >
                <Box
                    component='img'
                    src='/fundoperfil.png'
                    alt='imagem de fundo do perfil'
                    sx={{
                        width: '100%',
                        height: { xs: '150px', md: '280px' },
                        margin: '0',
                        borderRadius: '8px',
                        objectFit: 'cover'
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.5rem',
                        marginTop: { xs: '-50px', md: '-90px' }
                    }}>
                    <Avatar
                        src={profileImage}
                        alt='Foto de perfil da ONG'
                        onError={() => {
                            setProfileImage("/nomelogo.png");
                        }}
                        sx={{
                            height: { xs: '90px', md: '150px' },
                            width: 'auto',
                            mx: '1rem'
                        }}
                    />

                    <Typography
                        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                        noWrap
                    >
                        {ongData.name}
                    </Typography>
                </Box>

                <Grid2 container spacing={2} my={2}>
                    <Grid2 size={{ xs: 12, md: 4 }}
                        sx={{
                            padding: { xs: 0, md: '1rem' },
                        }}>
                        <Box
                            sx={{
                                border: '1px solid #F0F0F0',
                                height: 'auto',
                                padding: '1rem',
                                borderRadius: '8px',
                            }}>
                            <Typography variant='h5' sx={{ fontWeight: 700, }}>Sobre</Typography>

                            {!isLoading && ongData && (
                                <Box
                                    sx={{
                                        borderRadius: '8px',
                                        my: '1rem',
                                    }}>
                                    <Typography color="textSecondary" sx={{ marginBottom: '8px', fontWeight: 'bold' }}>{ongData.about}</Typography>

                                    <Box display="flex" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        <Place sx={{ marginRight: '8px' }} />
                                        <Typography color="textSecondary" >
                                            {ongData.state} - {ongData.city}
                                        </Typography>
                                    </Box>

                                    <Stack direction='row' spacing={1}>
                                        <Email />
                                        <Typography color="textSecondary" sx={{ fontWeight: 'bold' }} noWrap >
                                            {user.email}
                                        </Typography>
                                    </Stack>

                                </Box>
                            )}
                        </Box>

                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 8 }}>
                        <Tabs value={tabIndex} onChange={handleTabChange} centered>
                            <Tab label="Editar Perfil" />
                            <Tab label="Postagens" />
                            <Tab label="Projetos" />
                        </Tabs>

                        <Box>
                            {tabIndex === 0 && (
                                <Box
                                    component='form'
                                    onSubmit={handleSubmit(handleEditProfile)}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.5rem',
                                        my: '2rem'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mt: 2,
                                            mb: 4,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                <IconButton
                                                    color="primary"
                                                    aria-label="upload picture"
                                                    component="label"
                                                    sx={{
                                                        backgroundColor: 'white',
                                                        boxShadow: 3,
                                                        '&:hover': { backgroundColor: 'gray' }
                                                    }}
                                                    disabled={isLoading}
                                                >
                                                    <Box
                                                        component='input'
                                                        hidden
                                                        accept="image/*"
                                                        type="file"
                                                        onInput={handleFileChange}
                                                    />
                                                    <PhotoCamera />
                                                </IconButton>
                                            }
                                        >
                                            <Avatar
                                                alt="User Avatar"
                                                src={profileImage}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </Badge>
                                    </Box>

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
                                        <Grid2
                                            size={{ xs: isMobile ? 6 : 12, md: 6 }}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: isMobile ? 'flex-end' : 'flex-start',
                                            }}
                                        >
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

                                        <Grid2
                                            size={{ xs: isMobile ? 6 : 12, md: 6 }}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: isMobile ? 'flex-start' : 'flex-end',
                                            }}
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel>Estado</InputLabel>
                                                <Select
                                                    {...register("state")}
                                                    error={!!errors.state}
                                                    defaultValue=""
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

                            {tabIndex === 1 && (
                                <Container maxWidth='md'>
                                    {!isLoading && postData.length > 0 && (
                                        <Grid2 container spacing={2} sx={{ marginTop: '3rem' }}>
                                            {postData.map((post, index) => (
                                                <Grid2 key={index} size={12}>
                                                    <CardPost
                                                        fetchPost={fetchPost}
                                                        profilePath={post.Ong.imagePath}
                                                        description={post.description}
                                                        postImagePath={post.imagePath}
                                                        createdAt={post.createdAt}
                                                        OngName={post.Ong.name}
                                                        id={post.id}
                                                        showDeleteButton={true}
                                                    />
                                                </Grid2>
                                            ))}
                                        </Grid2>
                                    )}
                                </Container>
                            )}

                            {tabIndex === 2 && (
                                <Container maxWidth='md' >
                                    {!isLoading && projectData.projects.length > 0 && (
                                        <Grid2 container spacing={2} my={2}>
                                            {
                                                projectData.projects.map(
                                                    (project) => (
                                                        <Grid2 key={project.id} size={{ xs: 12, md: 6 }}>
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
            </Box >
        );
    }
