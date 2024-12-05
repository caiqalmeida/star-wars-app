import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface PersonFilterProps {
  onButtonFilterClick: ({planetsTermFilter, speciesTermFilter, starshipsTermFilter} : {planetsTermFilter: string, speciesTermFilter: string, starshipsTermFilter: string}) => void;
  isLoadingFiltersData: boolean;
  isSearching: boolean;
}

export function PersonFilter ({onButtonFilterClick, isLoadingFiltersData, isSearching}: PersonFilterProps) {
  const [planetsTermFilter, setPlanetsTermFilter] = useState('');
  const [speciesTermFilter, setSpeciesTermFilter] = useState('');
  const [starshipsTermFilter, setStarshipsTermFilter] = useState('');

  return (
    <Box
    sx={{ 
          width: "100%", 
          minWidth: "300px", 
          maxWidth: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
    }}
  >
    <TextField
      label="Planet filter"
      value={planetsTermFilter}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setPlanetsTermFilter(event.target.value);
      }}
      sx={{
        width: "100%",
        '.MuiInputBase-root': {
          backgroundColor: 'white',
          borderRadius: '4px',
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
      }}
     />
           <TextField
      label="Specie filter"
      value={speciesTermFilter}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeciesTermFilter(event.target.value);
      }}
      sx={{
        width: "100%",
        '.MuiInputBase-root': {
          backgroundColor: 'white',
          borderRadius: '4px',
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
      }}
      />
       <TextField
      label="Starship filter"
      value={starshipsTermFilter}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setStarshipsTermFilter(event.target.value);
      }}
      sx={{
        width: "100%",
        '.MuiInputBase-root': {
          backgroundColor: 'white',
          borderRadius: '4px',
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
      }}
     />

    <Button disabled={isLoadingFiltersData || !isSearching} variant="contained" sx={{height: "56px"}} onClick={() => onButtonFilterClick({planetsTermFilter, speciesTermFilter, starshipsTermFilter})} >Filter</Button>
  </Box>
  )
}