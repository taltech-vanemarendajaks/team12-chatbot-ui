import {
    CancelButton,
    ConfirmActions,
    ConfirmBox,
    ConfirmButton,
    ConfirmMessage,
    ConfirmOverlay,
    ConfirmTitle,
} from "./styles/confirmDialogStyles";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = "Delete",
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <ConfirmOverlay onClick={onCancel}>
            <ConfirmBox onClick={(e) => e.stopPropagation()}>
                <ConfirmTitle>{title}</ConfirmTitle>
                <ConfirmMessage>{message}</ConfirmMessage>
                <ConfirmActions>
                    <CancelButton onClick={onCancel}>Cancel</CancelButton>
                    <ConfirmButton onClick={onConfirm}>
                        {confirmLabel}
                    </ConfirmButton>
                </ConfirmActions>
            </ConfirmBox>
        </ConfirmOverlay>
    );
}
