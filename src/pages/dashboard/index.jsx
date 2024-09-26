import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Paper,
    Box,
} from '@mui/material';

export function DashboardPage() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 2, textAlign: 'center' }}>
                            <Typography variant="h5">Resumo das Estatísticas</Typography>
                            {/* Coloque gráficos ou informações estatísticas aqui */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6">Gráfico de Desempenho</Typography>
                            {/* Insira um gráfico de desempenho aqui */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6">Últimas Atividades</Typography>
                            {/* Liste as últimas atividades aqui */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6">Métricas</Typography>
                            {/* Coloque as métricas aqui */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6">Notificações</Typography>
                            {/* Insira notificações aqui */}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6">Tarefas Pendentes</Typography>
                            {/* Liste as tarefas pendentes aqui */}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};