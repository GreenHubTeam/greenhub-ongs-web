import { z } from "zod";
import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const descriptionFormSchema = z.object({
    description: z.string().min(1, "Descrição é obrigatória")
});

export function ModalAiProject({ open, handleClose, onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(descriptionFormSchema),
    });
    const [loading, setLoading] = useState(false);

    const modalSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await api.post('/gemini/createInfo', {
                description: data.description,
            });

            const { title, description } = response.data.data; 
            console.log(response.data);
            onSubmit({  title, description });
            toast.success('Projeto criado com sucesso! Preencha os detalhes para finalizar.');
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error('Erro ao criar o projeto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={!loading ? handleClose : undefined}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: {
                    xs: '90%', 
                    sm: '400px', 
                },
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
                        rows={4}
                        margin="normal"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Enviar'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}
