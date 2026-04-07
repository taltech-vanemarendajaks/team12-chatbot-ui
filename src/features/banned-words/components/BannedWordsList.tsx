import {
    Button,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import type { BannedWord } from "../types";

interface BannedWordsListProps {
    words: BannedWord[];
    onEdit: (word: BannedWord) => void;
    onToggleActive: (word: BannedWord) => Promise<void>;
}

export default function BannedWordsList({
                                            words,
                                            onEdit,
                                            onToggleActive,
                                        }: BannedWordsListProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Sõna</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Kategooria</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Severity</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Olek
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Tegevused
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {words.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Banned worde ei leitud
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        words.map((word) => (
                            <TableRow
                                key={word.id}
                                sx={{ "&:hover": { bgcolor: "action.hover" } }}
                            >
                                <TableCell>{word.word}</TableCell>
                                <TableCell>{word.category || "-"}</TableCell>
                                <TableCell>{word.severity ?? "-"}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={word.isActive ? "Aktiivne" : "Mitteaktiivne"}
                                        color={word.isActive ? "success" : "default"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={() => onEdit(word)}
                                        sx={{ color: "primary.main" }}
                                        title="Muuda"
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => onToggleActive(word)}
                                        sx={{
                                            ml: 1,
                                            bgcolor: word.isActive
                                                ? "error.main"
                                                : "success.main",
                                            color: "white",
                                            "&:hover": {
                                                bgcolor: word.isActive
                                                    ? "error.dark"
                                                    : "success.dark",
                                            },
                                        }}
                                    >
                                        {word.isActive ? "Inaktiveeri" : "Aktiveeri"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}