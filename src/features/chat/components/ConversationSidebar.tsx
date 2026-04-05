import { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MenuIcon from "@mui/icons-material/Menu";

import type { Conversation } from "@/app/models/Conversation";
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog";
import { formatDateTime } from "@/shared/ui/formatDateTime";
import {
    SidebarRoot,
    SidebarHeader,
    SidebarTitle,
    SidebarList,
    SidebarItem,
    SidebarItemInfo,
    SidebarItemTitle,
    SidebarItemTime,
    SidebarEmpty,
    SidebarCreateForm,
    SidebarInput,
    SidebarIconButton,
    SidebarAddButton,
    SidebarDeleteButton,
} from "../styles/sidebarStyles";

type ConversationSidebarProps = {
    conversations: Conversation[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    onCreate: (title: string) => void;
    onDelete: (id: number) => void;
};

export function ConversationSidebar({
    conversations,
    selectedId,
    onSelect,
    onCreate,
    onDelete,
}: ConversationSidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [title, setTitle] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            onDelete(deleteId);
            setDeleteId(null);
        }
    };

    const handleCreate = () => {
        const trimmed = title.trim();

        if (!trimmed) return;

        onCreate(trimmed);
        setTitle("");
        setShowCreate(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCreate();
        } else if (e.key === "Escape") {
            setShowCreate(false);
            setTitle("");
        }
    };

    const sorted = useMemo(
        () =>
            [...conversations].sort(
                (a, b) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime(),
            ),
        [conversations],
    );

    return (
        <SidebarRoot collapsed={collapsed}>
            <SidebarHeader collapsed={collapsed}>
                <SidebarIconButton
                    size="small"
                    onClick={() => setCollapsed((prev) => !prev)}
                >
                    <MenuIcon fontSize="small" />
                </SidebarIconButton>
                {!collapsed && (
                    <>
                        <SidebarTitle>Conversations</SidebarTitle>
                        <SidebarAddButton
                            size="small"
                            onClick={() => setShowCreate((prev) => !prev)}
                        >
                            <AddIcon fontSize="small" />
                        </SidebarAddButton>
                    </>
                )}
            </SidebarHeader>

            {!collapsed && (
                <>
                    {showCreate && (
                        <SidebarCreateForm>
                            <SidebarInput
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Conversation title..."
                                autoFocus
                            />
                            <SidebarAddButton
                                size="small"
                                onClick={handleCreate}
                                disabled={!title.trim()}
                            >
                                <AddIcon fontSize="small" />
                            </SidebarAddButton>
                        </SidebarCreateForm>
                    )}

                    <SidebarList>
                        {sorted.length === 0 ? (
                            <SidebarEmpty>No conversations yet</SidebarEmpty>
                        ) : (
                            sorted.map((conversation) => (
                                <SidebarItem
                                    key={conversation.id}
                                    selected={conversation.id === selectedId}
                                    onClick={() => onSelect(conversation.id)}
                                >
                                    <SidebarItemInfo>
                                        <SidebarItemTitle>
                                            {conversation.title}
                                        </SidebarItemTitle>
                                        <SidebarItemTime>
                                            {formatDateTime(
                                                conversation.updatedAt,
                                            )}
                                        </SidebarItemTime>
                                    </SidebarItemInfo>
                                    <SidebarDeleteButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteId(conversation.id);
                                        }}
                                    >
                                        <DeleteOutlineIcon
                                            fontSize="small"
                                        />
                                    </SidebarDeleteButton>
                                </SidebarItem>
                            ))
                        )}
                    </SidebarList>
                </>
            )}

            <ConfirmDialog
                open={deleteId !== null}
                title="Delete conversation"
                message="Are you sure you want to delete this conversation?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteId(null)}
            />
        </SidebarRoot>
    );
}
