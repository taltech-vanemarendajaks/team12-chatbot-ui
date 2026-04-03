import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmColor?: "error" | "success" | "primary" | "secondary";
}

export default function DeleteConfirmationDialog({
  open,
  title = "Kustuta valmisvastus",
  description = "Kas olete kindel, et soovite selle valmisvastuse kustutada? Seda toimingut ei saa tagasi võtta.",
  confirmText = "Kustuta",
  cancelText = "Tühista",
  onConfirm,
  onClose,
  confirmColor = "error",
}: Props) {
  const [displayDescription, setDisplayDescription] =
    React.useState(description);

  React.useEffect(() => {
    if (open && description) setDisplayDescription(description);
  }, [open, description]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-title"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        id="delete-confirmation-title"
        sx={(theme) => ({
          bgcolor: theme.palette.primary.main,
          color: "#fff",
          py: 2,
          px: 3,
          // corners are clipped by Paper's overflow:hidden
        })}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 8, pb: 1 }}>
        <DialogContentText
          sx={{
            color: "text.secondary",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            mt: 2,
          }}
        >
          {displayDescription}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 3, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            px: 3,
            py: 1,
            borderColor: "divider",
            color: "text.primary",
            "&:hover": {
              borderColor: "text.secondary",
              bgcolor: "action.hover",
            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={(theme) => ({
            px: 3,
            py: 1,
            bgcolor:
              (theme.palette as any)[confirmColor]?.main ??
              theme.palette[confirmColor].main,
            color: theme.palette.getContrastText(
              (theme.palette as any)[confirmColor]?.main ??
                theme.palette[confirmColor].main,
            ),
            fontWeight: 600,
            boxShadow: `0 2px 8px ${(theme.palette as any)[confirmColor]?.main ?? theme.palette[confirmColor].main}40`,
            "&:hover": {
              bgcolor:
                (theme.palette as any)[confirmColor]?.dark ??
                theme.palette[confirmColor].dark,
              boxShadow: `0 4px 12px ${(theme.palette as any)[confirmColor]?.main ?? theme.palette[confirmColor].main}50`,
            },
          })}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
