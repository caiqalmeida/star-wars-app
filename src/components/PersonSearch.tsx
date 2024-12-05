import { Box, Button, TextField } from "@mui/material";

interface PersonSearchProps {
  onButtonSearchClick: (searchTerm: string) => void;
  searchTerm: string;
  handleSetSearchTerm: (searchTerm: string) => void;
}

export function PersonSearch ({onButtonSearchClick, searchTerm, handleSetSearchTerm}: PersonSearchProps) {
  return (
    <Box
    sx={{ 
          width: "100%", 
          minWidth: "300px", 
          maxWidth: "450px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          mb: "2rem"
    }}
  >
    <TextField
      id="outlined-controlled"
      label="Insert a character name"
      value={searchTerm}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleSetSearchTerm(event.target.value);
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
    <Button variant="contained" sx={{height: "56px"}} onClick={() => onButtonSearchClick(searchTerm)} >Search</Button>
  </Box>
  )
}