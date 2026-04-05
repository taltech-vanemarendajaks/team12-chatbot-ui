import {
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import type { BannedWord } from "../types";

interface BannedWordsTableProps {
    rows: BannedWord[];
    loading: boolean;
    onEditClick: (row: BannedWord) => void;
    onDeleteClick: (id: number) => void;
}

export default function BannedWordsTable({
                                             rows,
                                             loading,
                                             onEditClick,
                                             onDeleteClick,
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
            <TableRow key={row.id} hover>
                <TableCell>
                    <Typography fontWeight={600} color="text.primary">
                        {row.word}
                    </Typography>
                </TableCell>

                <TableCell>{row.category || "-"}</TableCell>

                <TableCell>{row.severity ?? "-"}</TableCell>

                <TableCell>
                    <Chip
                        label={row.isActive ? "Aktiivne" : "Mitteaktiivne"}
                        color={row.isActive ? "success" : "default"}
                        size="small"
                    />
                </TableCell>

                <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => onEditClick(row)}
                        >
                            Muuda
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => onDeleteClick(row.id)}
                        >
                            Kustuta
                        </Button>
                    </Stack>
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
                            <TableCell sx={{ color: "text.secondary", fontWeight: 600 }}>
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