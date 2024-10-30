import { z } from "zod";
import { useState } from "react";
import { api } from "../../libs/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DialogActions, TextField } from "@mui/material";
import { CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";

const descriptionFormSchema = z.object({
    description: z.string().min(100, "Minimo de 100 Caracteres")
});

// eslint-disable-next-line react/prop-types
export function ModalAiProject({ open, handleClose, onSubmit }) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(descriptionFormSchema),
    });

    const modalSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await api.post('/gemini/createInfo', {
                description: data.description,
            });

            const { title, description } = response.data.data;
            onSubmit({ title, description });
            toast.success('Projeto criado com sucesso! Preencha os detalhes para finalizar.');
        } catch {
            toast.error('Erro ao criar o projeto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={!loading ? handleClose : undefined}
            fullWidth

        >
            <form onSubmit={handleSubmit(modalSubmit)}>
                <DialogTitle>
                    Descreva seu Projeto
                </DialogTitle>

                <DialogContent>
                    <TextField
                        label="Descrição (Detalhe o maximo que puder)"
                        fullWidth
                        {...register('description')}
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                        multiline
                        rows={6}
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="outlined"
                        sx={{ border: '1px solid gray', color: 'black' }}
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: 'green' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Criar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
