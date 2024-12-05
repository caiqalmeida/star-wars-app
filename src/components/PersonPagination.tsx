import { Box, Button, Typography } from "@mui/material";

interface PersonPaginationProps {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  isLoadingPeople: boolean;
  handleChangePage: (page: number) => void;
}

export function PersonPagination ({hasPreviousPage, hasNextPage, currentPage, isLoadingPeople, handleChangePage } : PersonPaginationProps) {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1.5rem"
    }}>
      <Button disabled={!hasPreviousPage || isLoadingPeople || currentPage === 1} variant="outlined" onClick={() => handleChangePage(-1)}>Previous</Button>
      <Typography>Page {currentPage}</Typography>
      <Button disabled={!hasNextPage || isLoadingPeople} variant="outlined" onClick={() => handleChangePage(+1)}>Next</Button>
    </Box>
  )
}