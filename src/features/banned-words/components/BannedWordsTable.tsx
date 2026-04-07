import {
    Box,
    Button,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import type { BannedWord } from "../types";

interface BannedWordsTableProps {
    rows: BannedWord[];
    loading: boolean;
    onEditClick: (row: BannedWord) => void;
    onToggleActiveClick: (row: BannedWord) => void;
}

export default function BannedWordsTable({
                                             rows,
                                             loading,
                                             onEditClick,
                                             onToggleActiveClick,
                                         }: BannedWordsTableProps) {
    const renderContent = () => {
        if (loading) {
            return (
                <TableRow>
                    <TableCell colSpan={5} align="center">
                        Laadimine...
                    </TableCell>
                </TableRow>
            );
        }

        if (rows.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={5} align="center">
                        Ühtegi kirjet ei leitud.
                    </TableCell>
                </TableRow>
            );
        }

        return rows.map((row) => (
            <TableRow
                key={row.id}
                hover
                sx={{ "&:hover": { bgcolor: "action.hover" } }}
            >
                <TableCell>
                    <Typography fontWeight={600} color="text.primary">
                        {row.word}
                    </Typography>
                </TableCell>

                <TableCell>{row.category || "-"}</TableCell>

                <TableCell>{row.severity ?? "-"}</TableCell>

                <TableCell align="center">
                    <Chip
                        label={row.isActive ? "Aktiivne" : "Mitteaktiivne"}
                        color={row.isActive ? "success" : "default"}
                        size="small"
                    />
                </TableCell>

                <TableCell align="right">
                    <IconButton
                        onClick={() => onEditClick(row)}
                        sx={{ color: "primary.main" }}
                        title="Muuda"
                    >
                        <EditIcon />
                    </IconButton>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => onToggleActiveClick(row)}
                        sx={{
                            ml: 1,
                            bgcolor: row.isActive ? "error.main" : "success.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: row.isActive ? "error.dark" : "success.dark",
                            },
                        }}
                    >
                        {row.isActive ? "Inaktiveeri" : "Aktiveeri"}
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <Paper
            elevation={0}
            sx={{
                border: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
            }}
        >
            <Box sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "action.hover" }}>
                            <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                                Sõna
                            </TableCell>
                            <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                                Kategooria
                            </TableCell>
                            <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
                                Raskusaste
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ color: "text.secondary", fontWeight: 600 }}
                            >
                                Staatus
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: "text.secondary", fontWeight: 600 }}
                            >
                                Tegevused
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{renderContent()}</TableBody>
                </Table>
            </Box>
        </Paper>
    );
}