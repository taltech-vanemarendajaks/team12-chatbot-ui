import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { stampAnswerApi } from "../api/stampAnswerApi";
import type { StampAnswer } from "../types/stampAnswer.types";
import StampAnswerDialog from "../components/StampAnswerDialog";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";

export default function StampAnswersPage() {
  const [stampAnswers, setStampAnswers] = useState<StampAnswer[]>([]);
  const [filteredAnswers, setFilteredAnswers] = useState<StampAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<StampAnswer | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<StampAnswer | null>(null);

  useEffect(() => {
    loadStampAnswers();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [stampAnswers, searchTerm, filterActive, sortBy]);

  const loadStampAnswers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await stampAnswerApi.getAll();
      setStampAnswers(data);
    } catch (err) {
      setError("Viga valmisvastuste laadimisel");
      console.error("Error loading stamp answers:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...stampAnswers];

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (answer) =>
          answer.question.toLowerCase().includes(lowerSearch) ||
          answer.answer.toLowerCase().includes(lowerSearch) ||
          answer.keywords?.toLowerCase().includes(lowerSearch),
      );
    }

    // Apply active filter
    if (filterActive === "active") {
      filtered = filtered.filter((answer) => answer.isActive);
    } else if (filterActive === "inactive") {
      filtered = filtered.filter((answer) => !answer.isActive);
    }

    // Apply sorting
    switch (sortBy) {
      case "recent":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "question":
        filtered.sort((a, b) => a.question.localeCompare(b.question));
        break;
      case "mostUsed":
        filtered.sort((a, b) => b.usageCount - a.usageCount);
        break;
      case "priority":
        filtered.sort((a, b) => b.priority - a.priority);
        break;
      default:
        break;
    }

    setFilteredAnswers(filtered);
  };

  const handleAdd = () => {
    setSelectedAnswer(null);
    setDialogOpen(true);
  };

  const handleEdit = (answer: StampAnswer) => {
    setSelectedAnswer(answer);
    setDialogOpen(true);
  };

  const handleToggleActive = (answer: StampAnswer) => {
    setDeleteTarget(answer);
    setDeleteDialogOpen(true);
  };

  const confirmToggleActive = async () => {
    if (!deleteTarget) return;
    try {
      await stampAnswerApi.update(deleteTarget.id, {
        isActive: !deleteTarget.isActive,
      });
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
      await loadStampAnswers();
    } catch (err) {
      setError("Viga valmisvastuse salvestamisel");
      console.error("Error toggling stamp answer active state:", err);
    }
  };

  const handleDialogClose = (reload?: boolean) => {
    setDialogOpen(false);
    setSelectedAnswer(null);
    if (reload) {
      loadStampAnswers();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterActive(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Valmisvastused
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Hallake eeldefineeritud küsimusi ja vastuseid
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Add Button */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ bgcolor: "primary.main" }}
        >
          Lisa uus
        </Button>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: "surface" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="Otsi..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
              ),
            }}
            sx={{ flex: "1 1 300px" }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Olek</InputLabel>
            <Select
              value={filterActive}
              onChange={handleFilterChange}
              label="Olek"
            >
              <MenuItem value="all">Kõik</MenuItem>
              <MenuItem value="active">Aktiivsed</MenuItem>
              <MenuItem value="inactive">Mitteaktiivsed</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sorteeri</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} label="Sorteeri">
              <MenuItem value="recent">Viimati lisatud</MenuItem>
              <MenuItem value="question">Küsimus (A-Z)</MenuItem>
              <MenuItem value="mostUsed">Enim kasutatud</MenuItem>
              <MenuItem value="priority">Prioriteet</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ bgcolor: "surface" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                Küsimus
              </TableCell>
              <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                Vastus
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontWeight: "bold" }}
                align="center"
              >
                Olek
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontWeight: "bold" }}
                align="center"
              >
                Kasutatud
              </TableCell>
              <TableCell
                sx={{ color: "text.secondary", fontWeight: "bold" }}
                align="right"
              >
                Tegevused
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnswers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Valmisvastuseid ei leitud
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAnswers.map((answer) => (
                <TableRow
                  key={answer.id}
                  sx={{ "&:hover": { bgcolor: "action.hover" } }}
                >
                  <TableCell sx={{ color: "text.primary", maxWidth: 300 }}>
                    {answer.question}
                  </TableCell>
                  <TableCell sx={{ color: "text.primary", maxWidth: 400 }}>
                    {answer.answer.length > 100
                      ? `${answer.answer.substring(0, 100)}...`
                      : answer.answer}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={answer.isActive ? "Aktiivne" : "Mitteaktiivne"}
                      color={answer.isActive ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ color: "text.primary" }}>
                    {answer.usageCount}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEdit(answer)}
                      sx={{ color: "primary.main" }}
                      title="Muuda"
                    >
                      <EditIcon />
                    </IconButton>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleToggleActive(answer)}
                      sx={{
                        ml: 1,
                        bgcolor: answer.isActive
                          ? "error.main"
                          : "success.main",
                        color: "surface",
                        "&:hover": {
                          bgcolor: answer.isActive
                            ? "error.dark"
                            : "success.dark",
                        },
                      }}
                    >
                      {answer.isActive ? "Inaktiveeri" : "Aktiveeri"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <StampAnswerDialog
        open={dialogOpen}
        answer={selectedAnswer}
        onClose={handleDialogClose}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        title={
          deleteTarget
            ? deleteTarget.isActive
              ? "Inaktiveeri valmisvastus"
              : "Aktiveeri valmisvastus"
            : "Muuda valmisvastuse olekut"
        }
        description={
          deleteTarget
            ? deleteTarget.isActive
              ? `Inaktiveeri valmisvastus: "${deleteTarget.question}"? Inaktiveerimisel ei kasutata chatbotis antud küsimuse vastuseks: "${deleteTarget.answer}". Toiming on võimalik tagasi võtta, kui valmisvastus uuesti aktiveerida.`
              : `Aktiveeri valmisvastus: "${deleteTarget.question}"? Aktiveerimisel kasutatakse valmisvastust chatbotis küsimustele vastamiseks.`
            : undefined
        }
        confirmText={
          deleteTarget
            ? deleteTarget.isActive
              ? "Inaktiveeri"
              : "Aktiveeri"
            : "Kinnita"
        }
        confirmColor={
          deleteTarget
            ? deleteTarget.isActive
              ? "error"
              : "success"
            : "primary"
        }
        onConfirm={confirmToggleActive}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
      />
    </Box>
  );
}
