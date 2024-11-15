import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import KeyIcon from '@mui/icons-material/Key';
import { useAuth } from "../../context/authContext";
import PersonIcon from '@mui/icons-material/Person';
import { zodResolver } from "@hookform/resolvers/zod";
import { HeaderComponent } from "../../components/header";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ModalLoginComponent } from "../../components/cardPolicies";
import { Box, Divider, InputAdornment, TextField, Button, Typography, IconButton, CircularProgress, Grid2 } from "@mui/material";

const formularioLogin = z.object({
    email: z.string().min(4, "Minimo de 4 caracteres").email("Email invalido"),
    password: z.string().min(4, "Minimo de 4 caracteres").max(30)
});

export function LoginPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formularioLogin),
        mode: 'onChange'
    });

    const { loginUser } = useAuth();

    async function handleLogin(data) {
        setLoading(true);
        await loginUser(data.email, data.password);
        setLoading(false);
    }

    return (
        <Grid2 container sx={{ minHeight: '100vh' }}>
            <Grid2
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}
                >
                    <HeaderComponent />

                    <Box
                        sx={{
                            marginTop: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            padding: { xs: 0, md: '2rem' },
                        }}
                        component='form'
                        onSubmit={handleSubmit(handleLogin)}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Acesse sua conta
                        </Typography>

                        <TextField
                            helperText={errors?.email?.message}
                            error={!!errors.email}
                            {...register("email")}
                            fullWidth
                            required
                            type='email'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                        <Divider orientation="vertical" flexItem />
                                    </InputAdornment>
                                ),
                            }}
                            label="E-mail"
                        />

                        <TextField
                            helperText={errors?.password?.message}
                            error={!!errors.password}
                            {...register('password')}
                            fullWidth
                            required
                            type={isShowPassword ? 'text' : "password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                        <Divider orientation="vertical" flexItem />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <IconButton onClick={() => setIsShowPassword(prev => !prev)}>
                                        {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                            label="Senha"
                        />

                        <Box sx={{ display: 'flex' }}>
                            <Typography>Você não tem conta? </Typography>
                            <Box component={Link} to='/registro' sx={{ color: '#22703E', marginLeft: 1 }}>
                                Cadastre-se
                            </Box>
                        </Box>

                        <Button
                            disabled={loading}
                            type="submit"
                            variant='contained'
                            sx={{
                                backgroundColor: '#22703E',
                                height: '3.5rem',
                                width: '50%',
                                margin: '0 auto',
                            }}
                        >
                            {loading ? <CircularProgress color="success" size={24} /> : "Entrar"}
                        </Button>
                    </Box>
                    <ModalLoginComponent />
                </Box>
            </Grid2>

            <Grid2
                size={{ xs: false, md: 6 }}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    backgroundImage: 'url(/paraguaio.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                }}
            />
        </Grid2>
    )
}
