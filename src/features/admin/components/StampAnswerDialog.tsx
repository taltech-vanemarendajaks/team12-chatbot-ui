import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Alert } from '@mui/material';
import { stampAnswerApi } from '../api/stampAnswerApi';
import type { StampAnswer, CreateStampAnswerRequest, UpdateStampAnswerRequest } from '../types/stampAnswer.types';

interface StampAnswerDialogProps {
    open: boolean;
    answer: StampAnswer | null;
    onClose: (reload?: boolean) => void;
}

export default function StampAnswerDialog({ open, answer, onClose }: StampAnswerDialogProps) {
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        keywords: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (answer) {
            setFormData({
                question: answer.question,
                answer: answer.answer,
                keywords: answer.keywords || '',
            });
        } else {
            setFormData({
                question: '',
                answer: '',
                keywords: '',
            });
        }
        setErrors({});
        setError(null);
    }, [answer, open]);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.question.trim()) {
            newErrors.question = 'Küsimus on kohustuslik';
        }

        if (!formData.answer.trim()) {
            newErrors.answer = 'Vastus on kohustuslik';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setSaving(true);
        setError(null);

        try {
            if (answer) {
                // Update existing answer
                const updateRequest: UpdateStampAnswerRequest = {
                    question: formData.question,
                    answer: formData.answer,
                    keywords: formData.keywords || undefined,
                };
                await stampAnswerApi.update(answer.id, updateRequest);
            } else {
                // Create new answer
                const createRequest: CreateStampAnswerRequest = {
                    question: formData.question,
                    answer: formData.answer,
                    keywords: formData.keywords || undefined,
                };
                await stampAnswerApi.create(createRequest);
            }
            onClose(true); // Close and reload
        } catch (err) {
            setError('Viga valmisvastuse salvestamisel');
            console.error('Error saving stamp answer:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        if (!saving) {
            onClose(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 2, overflow: 'hidden' } }}
        >
            <DialogTitle
                sx={(theme) => ({
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    py: 2,
                    px: 3,
                    // corners are clipped by Paper's overflow:hidden
                })}
            >
                {answer ? 'Muuda valmisvastust' : 'Lisa uus valmisvastus'}
            </DialogTitle>
            <DialogContent sx={{ pt: 4, pb: 2 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Küsimus"
                        value={formData.question}
                        onChange={handleChange('question')}
                        error={!!errors.question}
                        helperText={errors.question}
                        fullWidth
                        required
                        multiline
                        rows={2}
                    />

                    <TextField
                        label="Vastus"
                        value={formData.answer}
                        onChange={handleChange('answer')}
                        error={!!errors.answer}
                        helperText={errors.answer}
                        fullWidth
                        required
                        multiline
                        rows={4}
                    />

                    <TextField
                        label="Märksõnad"
                        value={formData.keywords}
                        onChange={handleChange('keywords')}
                        fullWidth
                        helperText="Komaga eraldatud märksõnad otsingu jaoks"
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pt: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={saving}>
                    Tühista
                </Button>
                <Button onClick={handleSave} variant="contained" disabled={saving}>
                    {saving ? 'Salvestamine...' : 'Salvesta'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
