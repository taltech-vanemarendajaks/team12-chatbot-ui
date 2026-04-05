import SendIcon from "@mui/icons-material/Send";
import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react";

import {
    CharCounter,
    InputBar,
    InputTextarea,
    InputTextareaWrapper,
    InputWrapper,
    SendButton,
} from "../styles/messageInputStyles";

type MessageInputProps = {
    onSend: (content: string) => void;
    disabled: boolean;
    maxLength: number | null;
};

export function MessageInput({ onSend, disabled, maxLength }: MessageInputProps) {
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const trimmed = text.trim();
    const overLimit = maxLength !== null && text.length > maxLength;
    const canSend = trimmed.length > 0 && !overLimit && !disabled;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);

        const el = e.target;

        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    const handleSend = () => {
        if (!canSend) return;

        onSend(trimmed);
        setText("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <InputWrapper>
            <InputBar overLimit={overLimit}>
                <InputTextareaWrapper>
                    <InputTextarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        disabled={disabled}
                        rows={1}
                    />

                    {maxLength !== null && text.length > 0 && (
                        <CharCounter overLimit={overLimit}>
                            {text.length}/{maxLength}
                        </CharCounter>
                    )}
                </InputTextareaWrapper>

                <SendButton
                    onClick={handleSend}
                    disabled={!canSend}
                    size="small"
                    active={canSend}
                >
                    <SendIcon fontSize="small" />
                </SendButton>
            </InputBar>
        </InputWrapper>
    );
}
