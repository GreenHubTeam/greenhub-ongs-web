import { z } from "zod";
import { toast } from "react-toastify";
import { api } from "../../libs/axios";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Typography, Button, CircularProgress, Modal } from '@mui/material';

const descriptionFormSchema = z.object({
    description: z.string().min(1, "Descrição do projeto é obrigatória"),
});

export function ModalAiProject() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(descriptionFormSchema),
    });
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await api.post('/gemini/createInfo', {
                description: data.description,
                token: token,
            });

            toast.success('Projeto criado com sucesso!');
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao criar o projeto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '600px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2">
                        Descreva seu projeto
                    </Typography>

                    <form onSubmit={handleSubmit(modalSubmit)}>
                        <TextField
                            label="Descrição"
                            fullWidth
                            {...register('description')}
                            error={!!errors.description}
                            helperText={errors?.description?.message}
                            multiline
                            rows={10}
                            margin="normal"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3 }}
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Enviar'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}
