import { Box, Divider, Grid2, InputAdornment, TextField } from "@mui/material";
import { Header } from "../../components/header";
import { CardContained } from "../../components/cardcontained";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

export function CadastroPage() {
  return (
    <Box>
      <Header />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '700px',
          margin: '0 auto',
          gap: '4rem'
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
            title="Dados da Empresa"
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
                    <PersonIcon />

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
                    <BadgeIcon />

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
            title="Localização"
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
            <Grid2 size={6}>
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
                fullWidth
                label="Nome social"
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
                        <BadgeIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="Nome social"
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
                        <FmdGoodIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="CEP"
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
                        <FmdGoodIcon />

                        <Divider orientation="vertical" flexItem />
                      </InputAdornment>
                    ),
                  },
                }}
                label="CEP"
              />
            </Grid2>
          </Grid2>

        </Box>

      </Box>
    </Box>
  )
}