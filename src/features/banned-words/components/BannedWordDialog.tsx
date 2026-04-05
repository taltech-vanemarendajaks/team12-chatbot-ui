import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { severityOptions } from "../constants/severityOptions";
import { categoryOptions } from "../constants/categoryOptions";
import type {
    BannedWord,
    CreateBannedWordRequest,
    UpdateBannedWordRequest,
} from "../types";

interface BannedWordDialogProps {
    open: boolean;
    mode: "create" | "edit";
    initialData: BannedWord | null;
    onClose: () => void;
    onSubmit: (
        payload: CreateBannedWordRequest | UpdateBannedWordRequest,
    ) => Promise<void>;
}

interface FormErrors {
    word: string;
    category: string;
    severity: string;
}

const initialErrors: FormErrors = {
    word: "",
    category: "",
    severity: "",
};

export default function BannedWordDialog({
                                             open,
                                             mode,
                                             initialData,
                                             onClose,
                                             onSubmit,
                                         }: BannedWordDialogProps) {
    const [word, setWord] = useState("");
    const [category, setCategory] = useState("");
    const [severity, setSeverity] = useState<string>("");
    const [status, setStatus] = useState<"active" | "inactive">("active");
    const [errors, setErrors] = useState<FormErrors>(initialErrors);

    useEffect(() => {
        if (!open) {
            return;
        }

        setErrors(initialErrors);

        if (mode === "edit" && initialData) {
            setWord(initialData.word ?? "");
            setCategory(initialData.category ?? "");
            setSeverity(
                initialData.severity !== undefined && initialData.severity !== null
                    ? String(initialData.severity)
                    : "",
            );
            setStatus(initialData.isActive ? "active" : "inactive");
            return;
        }

        setWord("");
        setCategory("");
        setSeverity("");
        setStatus("active");
    }, [open, mode, initialData]);

    const validateForm = () => {
        const nextErrors: FormErrors = {
            word: "",
            category: "",
            severity: "",
        };

        if (!word.trim()) {
            nextErrors.word = "Sõna on kohustuslik.";
        }

        if (!category) {
            nextErrors.category = "Kategooria on kohustuslik.";
        }

        if (!severity) {
            nextErrors.severity = "Raskusaste on kohustuslik.";
        }

        setErrors(nextErrors);

        return !nextErrors.word && !nextErrors.category && !nextErrors.severity;
    };

    const handleSubmit = async () => {
        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        const payload: CreateBannedWordRequest | UpdateBannedWordRequest = {
            word: word.trim(),
            category,
            severity,
            isActive: status === "active",
        };

        await onSubmit(payload);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    overflow: "hidden",
                },
            }}
        >
            <DialogTitle
                sx={(theme) => ({
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    py: 2,
                    px: 3,
                })}
            >
                <Typography variant="h6" fontWeight={600}>
                    {mode === "create"
                        ? "Lisa uus keelatud sõna"
                        : "Muuda keelatud sõna"}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ pt: 4, pb: 2 }}>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Sõna"
                        value={word}
                        onChange={(event) => setWord(event.target.value)}
                        error={Boolean(errors.word)}
                        helperText={errors.word}
                        fullWidth
                        required
                    />

                    <FormControl fullWidth required error={Boolean(errors.category)}>
                        <InputLabel id="banned-word-category-label">Kategooria</InputLabel>
                        <Select
                            labelId="banned-word-category-label"
                            value={category}
                            label="Kategooria"
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            {categoryOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.category}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth required error={Boolean(errors.severity)}>
                        <InputLabel id="banned-word-severity-label">Raskusaste</InputLabel>
                        <Select
                            labelId="banned-word-severity-label"
                            value={severity}
                            label="Raskusaste"
                            onChange={(event) => setSeverity(String(event.target.value))}
                        >
                            {severityOptions.map((option) => (
                                <MenuItem key={option.value} value={String(option.value)}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.severity}</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="banned-word-status-label">Staatus</InputLabel>
                        <Select
                            labelId="banned-word-status-label"
                            value={status}
                            label="Staatus"
                            onChange={(event) =>
                                setStatus(event.target.value as "active" | "inactive")
                            }
                        >
                            <MenuItem value="active">Aktiivne</MenuItem>
                            <MenuItem value="inactive">Mitteaktiivne</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pt: 2, pb: 3 }}>
                <Button onClick={onClose}>Tühista</Button>
                <Button variant="contained" onClick={() => void handleSubmit()}>
                    Salvesta
                </Button>
            </DialogActions>
        </Dialog>
    );
}