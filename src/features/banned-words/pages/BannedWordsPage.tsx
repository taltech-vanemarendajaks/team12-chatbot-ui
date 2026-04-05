import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Paper, Typography } from "@mui/material";
import {
    createBannedWord,
    deleteBannedWord,
    getBannedWords,
    updateBannedWord,
} from "../api/bannedWordsApi";
import BannedWordDialog from "../components/BannedWordDialog";
import BannedWordsTable from "../components/BannedWordsTable";
import BannedWordsToolbar, {
    type StatusFilter,
} from "../components/BannedWordsToolbar";
import type {
    BannedWord,
    CreateBannedWordRequest,
    UpdateBannedWordRequest,
} from "../types";

export default function BannedWordsPage() {
    const [rows, setRows] = useState<BannedWord[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("active");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
    const [selectedRow, setSelectedRow] = useState<BannedWord | null>(null);

    const loadRows = async () => {
        try {
            setLoading(true);
            setErrorMessage("");
            const data = await getBannedWords();
            setRows(data);
        } catch (error) {
            console.error(error);
            setErrorMessage("Keelatud sõnade laadimine ebaõnnestus.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadRows();
    }, []);

    const filteredRows = useMemo(() => {
        return rows.filter((row) => {
            const matchesSearch =
                row.word.toLowerCase().includes(searchValue.toLowerCase()) ||
                (row.category ?? "").toLowerCase().includes(searchValue.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && row.isActive) ||
                (statusFilter === "inactive" && !row.isActive);

            return matchesSearch && matchesStatus;
        });
    }, [rows, searchValue, statusFilter]);

    const handleOpenCreateDialog = () => {
        setDialogMode("create");
        setSelectedRow(null);
        setDialogOpen(true);
    };

    const handleOpenEditDialog = (row: BannedWord) => {
        setDialogMode("edit");
        setSelectedRow(row);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedRow(null);
    };

    const handleCreate = async (payload: CreateBannedWordRequest) => {
        try {
            setErrorMessage("");
            await createBannedWord(payload);
            setDialogOpen(false);
            await loadRows();
        } catch (error) {
            console.error(error);
            setErrorMessage("Keelatud sõna lisamine ebaõnnestus.");
            throw error;
        }
    };

    const handleUpdate = async (payload: UpdateBannedWordRequest) => {
        if (!selectedRow) {
            return;
        }

        try {
            setErrorMessage("");
            await updateBannedWord(selectedRow.id, payload);
            setDialogOpen(false);
            setSelectedRow(null);
            await loadRows();
        } catch (error) {
            console.error(error);
            setErrorMessage("Keelatud sõna muutmine ebaõnnestus.");
            throw error;
        }
    };

    const handleDelete = async (id: number) => {
        try {
            setErrorMessage("");
            await deleteBannedWord(id);
            await loadRows();
        } catch (error) {
            console.error(error);
            setErrorMessage("Keelatud sõna kustutamine ebaõnnestus.");
        }
    };

    const handleDialogSubmit = async (
        payload: CreateBannedWordRequest | UpdateBannedWordRequest,
    ) => {
        if (dialogMode === "create") {
            await handleCreate(payload as CreateBannedWordRequest);
            return;
        }

        await handleUpdate(payload as UpdateBannedWordRequest);
    };

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    overflow: "hidden",
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}
            >
                <Box
                    sx={{
                        bgcolor: "primary.main",
                        color: "common.white",
                        px: 3,
                        py: 2.5,
                    }}
                >
                    <Typography variant="h4" fontWeight={700}>
                        Keelatud sõnad
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.95, mt: 0.5 }}>
                        Halda keelatud sõnu ja nende staatust.
                    </Typography>
                </Box>

                <Box sx={{ p: 3, bgcolor: "background.default" }}>
                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <BannedWordsToolbar
                        searchValue={searchValue}
                        statusFilter={statusFilter}
                        onSearchChange={setSearchValue}
                        onStatusFilterChange={setStatusFilter}
                        onAddClick={handleOpenCreateDialog}
                    />

                    <BannedWordsTable
                        rows={filteredRows}
                        loading={loading}
                        onEditClick={handleOpenEditDialog}
                        onDeleteClick={(id) => void handleDelete(id)}
                    />
                </Box>
            </Paper>

            <BannedWordDialog
                open={dialogOpen}
                mode={dialogMode}
                initialData={selectedRow}
                onClose={handleCloseDialog}
                onSubmit={handleDialogSubmit}
            />
        </Box>
    );
}