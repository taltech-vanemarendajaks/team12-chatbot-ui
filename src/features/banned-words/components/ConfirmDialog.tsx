import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    confirmColor?: "primary" | "error" | "success";
    onConfirm: () => void;
    onClose: () => void;
}

export default function ConfirmDialog({
                                          open,
                                          title,
                                          description,
                                          confirmText = "Kinnita",
                                          confirmColor = "primary",
                                          onConfirm,
                                          onClose,
                                      }: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ color: "text.primary" }}>{title}</DialogTitle>

            {description && (
                <DialogContent>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </DialogContent>
            )}

            <DialogActions>
                <Button onClick={onClose}>Tühista</Button>
                <Button
                    variant="contained"
                    color={confirmColor}
                    onClick={onConfirm}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}