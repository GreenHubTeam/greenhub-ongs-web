import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { registerFormSchema } from './schema';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { zodResolver } from '@hookform/resolvers/zod';
import { HeaderComponent } from "../../components/header";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { CardContained } from "../../components/cardcontained";
import { Box, Divider, Grid2, InputAdornment, TextField, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { api } from '../../libs/axios';
import { toast } from 'react-toastify';

export function CadastroPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange'
  });

  async function HandleRegister(data) {
    const body = {
      user: {
        name: data.nomeResponsavel,
        email: data.email,
        password: data.senha,
        document: data.cpfResponsavel,
        type: "ONG"
      },
      ong: {
        name: "Marcelo duawiohduiwahduwaj9jifnufbayinfnwufibaufhuwaibfiwbfuibwaifbwaibfyawvfyuawbfubwafbyb",
        document: "123-123-123-23",
        about: data.ong.about,
        city: data.ong.city,
        district: data.ong.district,
        number: data.ong.number,
        state: data.ong.state,
        street: data.ong.street,
        zipcode: data.ong.zipcode,
        telephone: data.ong.telephone,
        complement: data.ong.complement,
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
            error={!!errors.nomesocial}
            helperText={errors?.nomesocial?.message}
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
            rows={4}
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

          <Grid2 container spacing={2}>
            <Grid2 size={3}>
              <TextField
                error={!!errors.numero}
                helperText={errors?.numero?.message}
                {...register("numero")}
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
                fullWidth
                label="Nº"
              />
            </Grid2>
            <Grid2 size={9}>
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
                        <FmdGoodIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Complemento"
              />

            </Grid2>

            <Grid2 size={3}>
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
                        <FmdGoodIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Bairro"
              />
            </Grid2>
            <Grid2 size={9}>
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
                        <FmdGoodIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Complemento"
              />
            </Grid2>

            <Grid2 size={3}>
              <TextField
                error={!!errors.estado}
                helperText={errors?.estado?.message}
                {...register("estado")}
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
                        <FmdGoodIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Estado"
              />
            </Grid2>

            <Grid2 size={9}>
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
                        <FmdGoodIcon />

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
            <Grid2 size={7}>
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
            <Grid2 size={5}>
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
                        <PersonIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="CPF do responsável"
              />

            </Grid2>

            <Grid2 size={6}>
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
                        <PersonIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Senha"
              />
            </Grid2>
            <Grid2 size={6}>
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
                        <PersonIcon />

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
          <Grid2 size={6}>
            <Button
              fullWidth
              variant='contained'
              sx={{
                backgroundColor: '#f0f0f0',
                height: '3.5rem',
                color: 'black',
              }}
              component={Link}
              to='/'
            >
              Voltar
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button
              fullWidth
              variant='contained'
              sx={{
                backgroundColor: '#22703E',
                height: '3.5rem',
              }}
              onClick={handleSubmit(HandleRegister)}
            >
              Confirmar
            </Button>
          </Grid2>
        </Grid2>

      </Box>

    </Box>
  )
}