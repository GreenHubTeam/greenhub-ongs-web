import { Box, Divider, Grid2, InputAdornment, TextField, Button } from "@mui/material";
import { HeaderComponent } from "../../components/header";
import { CardContained } from "../../components/cardcontained";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

export function CadastroPage() {
  return (
    <Box>
      <HeaderComponent />

      <Box
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
            label="Documento"
          />
          <TextField
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
        >
          Confirmar
        </Button>

      </Box>

    </Box>
  )
}