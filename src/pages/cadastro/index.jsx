import { useState } from "react";
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import KeyIcon from '@mui/icons-material/Key';
import { registerFormSchema } from './schema';
import { useNavigate } from "react-router-dom";
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import { useAuth } from "../../context/authContext";
import PersonIcon from '@mui/icons-material/Person';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { zodResolver } from '@hookform/resolvers/zod';
import NumbersIcon from '@mui/icons-material/Numbers';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { HeaderComponent } from "../../components/header";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CardContained } from "../../components/cardcontained";
import EditLocationIcon from '@mui/icons-material/EditLocation';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Box, Divider, Grid2, InputAdornment, TextField, Button, Select, FormControl, InputLabel, MenuItem, CircularProgress, useMediaQuery, Typography } from "@mui/material";

export function CadastroPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange'
  });

  const { registerUser } = useAuth();

  const StatesBrazilList = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      setValue("rua", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("cidade", data.localidade);
      setValue("estado", data.uf);
    });
  }

  async function HandleRegister(data) {
    setLoading(true);
    const body = {
      user: {
        name: data.nomeResponsavel,
        email: data.email,
        password: data.senha,
        document: data.cpfResponsavel,
        type: "ONG"
      },
      ong: {
        name: data.nomeSocial,
        document: data.documento,
        about: data.descricao,
        number: data.numero,
        state: data.estado,
        district: data.bairro,
        zipcode: data.cep,
        telephone: data.telefone,
        complement: data.complemento,
        street: data.rua,
        city: data.cidade,
      }
    }
    try {
      await registerUser(body);
      toast.success("Cadastro realizado com sucesso!");
      navigate('/');
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error interno no servidor");
      }
    }
  };

  return (
    <Box>
      <HeaderComponent />

      <Box
        component='form'
        onSubmit={handleSubmit(HandleRegister)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '700px',
          margin: '0 auto',
          gap: '4rem',
          paddingBottom: '2rem',
          padding: isMobile ? '2rem' : '0',
          marginBottom: '2rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <CardContained
            title="Dados da Empresa:"
            description="Preencha com as informações da sua empresa"
          />

          <TextField
            error={!!errors.documento}
            helperText={errors?.documento?.message}
            {...register("documento")}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}
                  >
                    <BadgeIcon />

                    <Divider orientation="vertical" flexItem />
                  </InputAdornment>
                ),
              },
            }}
            label='documento'
          />
          <TextField
            error={!!errors.nomeSocial}
            helperText={errors?.nomeSocial?.message}
            {...register("nomeSocial")}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}
                  >
                    <PersonIcon />

                    <Divider orientation="vertical" flexItem />
                  </InputAdornment>
                ),
              },
            }}
            label="Nome social"
          />
          <TextField
            error={!!errors.descricao}
            helperText={errors?.descricao?.message}
            {...register("descricao")}
            required
            multiline
            rows={6}
            label="Descrição"
          />

        </Box>


        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <CardContained
            title="Localização:"
            description="Insira a localização da sua empresa"
          />

          <TextField
            error={!!errors.cep}
            helperText={errors?.cep?.message}
            {...register("cep")}
            onBlur={checkCEP}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}
                  >
                    <FmdGoodIcon />

                    <Divider orientation="vertical" flexItem />
                  </InputAdornment>
                ),
              },
            }}
            label="CEP"
          />

          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 7 }}>
              <TextField
                error={!!errors.cidade}
                helperText={errors?.cidade?.message}
                {...register("cidade")}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}
                      >
                        <LocationCityIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="cidade"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <TextField
                error={!!errors.bairro}
                helperText={errors?.bairro?.message}
                {...register("bairro")}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}
                      >
                        <ApartmentIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Bairro"
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 7 }}>
              <TextField
                error={!!errors.rua}
                helperText={errors?.rua?.message}
                {...register("rua")}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ display: 'flex', gap: '0.5rem' }}>
                        <EditRoadIcon />
                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Rua"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 3 }}>
              <TextField
                error={!!errors.numero}
                helperText={errors?.numero?.message}
                {...register("numero")}
                required
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ display: 'flex', gap: '0.5rem' }}>
                        <NumbersIcon />
                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Nº"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 2 }}>
              <FormControl variant="outlined" error={!!errors.state} fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  fullWidth
                  {...register("state")}
                  label="Estado"
                  defaultValue=""
                >
                  {StatesBrazilList.map((state) => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
                {errors.state && <Typography color="error">{errors.state.message}</Typography>}
              </FormControl>
            </Grid2>

            <Grid2 size={12}>
              <TextField
                error={!!errors.complemento}
                helperText={errors?.complemento?.message}
                {...register("complemento")}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}
                      >
                        <EditLocationIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Complemento"
              />
            </Grid2>
          </Grid2>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >

          <CardContained
            title="Informações de Acessso:"
            description="Dados para acessar sua conta."
          />

          <TextField
            error={!!errors.telefone}
            helperText={errors?.telefone?.message}
            {...register('telefone')}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}
                  >
                    <LocalPhoneIcon />

                    <Divider orientation="vertical" flexItem />
                  </InputAdornment>
                ),
              },
            }}
            label="Telefone"
          />

          <TextField
            error={!!errors.email}
            helperText={errors?.email?.message}
            {...register('email')}
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}
                  >
                    <EmailIcon />

                    <Divider orientation="vertical" flexItem />
                  </InputAdornment>
                ),
              },
            }}
            label="E-mail de consulta"
          />

          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 7 }}>
              <TextField
                error={!!errors.nomeResponsavel}
                helperText={errors?.nomeResponsavel?.message}
                {...register('nomeResponsavel')}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}
                      >
                        <PersonIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                fullWidth
                label="Nome do responsável"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <TextField
                error={!!errors.cpfResponsavel}
                helperText={errors?.cpfResponsavel?.message}
                {...register('cpfResponsavel')}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}
                      >
                        <AssignmentIndIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="CPF do responsável"
              />

            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                type='password'
                error={!!errors.senha}
                helperText={errors?.senha?.message}
                {...register('senha')}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}
                      >
                        <KeyIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Senha"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                type='password'
                error={!!errors.confirmarSenha}
                helperText={errors?.confirmarSenha?.message}
                {...register('confirmarSenha')}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}
                      >
                        <CheckCircleIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Confirmar senha"
              />
            </Grid2>
          </Grid2>

        </Box>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant='outlined'
              sx={{
                height: '3.5rem',
              }}
              color="inherit"
              component={Link}
              to='/'
            >
              Voltar
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Button
              disabled={loading}
              fullWidth
              variant='contained'
              sx={{
                backgroundColor: '#22703E',
                height: '3.5rem',
              }}
              onClick={handleSubmit(HandleRegister)}
            >
              {loading ? <CircularProgress size={24} /> : "Confirmar"}
            </Button>
          </Grid2>
        </Grid2>

      </Box>

    </Box>
  )
}