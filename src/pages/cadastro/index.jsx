import { Box, Divider, Grid2, InputAdornment, TextField, Button } from "@mui/material";
import { HeaderComponent } from "../../components/header";
import { CardContained } from "../../components/cardcontained";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formularioschema = z.object({
  documento: z.string().min(1, 'Documento é obrigatório'),
  nomeSocial: z.string().min(1, 'Nome social é obrigatório'),
  descricao: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  cep: z.string().min(1, 'CEP é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().min(1, 'Complemento é obrigatório'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  estado: z.string().min(1, 'Estado é obrigatório'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().email('E-mail inválido'),
  nomeResponsavel: z.string().min(1, 'Nome do responsável é obrigatório'),
  cpfResponsavel: z.string().min(1, 'CPF do responsável é obrigatório'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmarSenha: z.string().min(6, 'Confirmação de senha deve ter no mínimo 6 caracteres'),
});

export function CadastroPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm({
    resolver: zodResolver(formularioschema),
    mode: 'onChange'
});

  function HandleRegister(data) {
    console.log(data);
  };

  return (
    <Box>
      <HeaderComponent />

      <Box component={'form'}
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
            label= 'documento'
          />
          <TextField
             error={!!errors.nomesocial}
             helperText={errors?.nomesocial?.message}
             {...register("nomesocial")}
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

        <Button
          variant='contained'
          sx={{
            backgroundColor: '#22703E',
            height: '3.5rem',
            width: '50%',
            margin: '0 auto',
          }}
          onClick={handleSubmit(HandleRegister)}
        >
          Confirmar
        </Button>

      </Box>

    </Box>
  )
}