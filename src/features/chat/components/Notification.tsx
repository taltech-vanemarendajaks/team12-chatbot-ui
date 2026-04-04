import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type NotificationProps = {
    message: string | null;
    severity: "warning" | "error";
};

export function Notification({ message, severity }: NotificationProps) {
    return (
        <Snackbar
            open={message !== null}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
}
