// @ts-ignore
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export type StatusFilter = "all" | "active" | "inactive";

interface BannedWordsToolbarProps {
    searchValue: string;
    statusFilter: StatusFilter;
    onSearchChange: (value: string) => void;
    onStatusFilterChange: (value: StatusFilter) => void;
    onAddClick: () => void;
}

export default function BannedWordsToolbar({
                                               searchValue,
                                               statusFilter,
                                               onSearchChange,
                                               onStatusFilterChange,
                                               onAddClick,
                                           }: BannedWordsToolbarProps) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
                mb: 3,
            }}
        >
            <TextField
                fullWidth
                placeholder="Otsi sõna või kategooriat..."
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
                sx={{ backgroundColor: "#ffffff" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "#6b7280" }} />
                        </InputAdornment>
                    ),
                }}
            />

            <FormControl sx={{ minWidth: 220, backgroundColor: "#ffffff" }}>
                <InputLabel id="banned-words-status-filter-label">Filter</InputLabel>
                <Select
                    labelId="banned-words-status-filter-label"
                    value={statusFilter}
                    label="Filter"
                    onChange={(event) =>
                        onStatusFilterChange(event.target.value as StatusFilter)
                    }
                >
                    <MenuItem value="all">Kõik</MenuItem>
                    <MenuItem value="active">Ainult aktiivsed</MenuItem>
                    <MenuItem value="inactive">Ainult mitteaktiivsed</MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAddClick}
                sx={{
                    whiteSpace: "nowrap",
                    backgroundColor: "#1976d2",
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: "#1565c0",
                        boxShadow: "none",
                    },
                }}
            >
                Lisa uus
            </Button>
        </Box>
    );
}