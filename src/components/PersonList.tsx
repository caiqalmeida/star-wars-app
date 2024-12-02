import { Box, Skeleton } from "@mui/material";
import { Person } from "../types/swapi";
import { PersonCard } from "./PersonCard";

interface PersonListProps {
  isLoading: boolean;
  people: [[Person]] | [];
  currentPage: number;
  handleOpenModal: (person: Person) => void;
}

export function PersonList ({isLoading, people, currentPage, handleOpenModal} : PersonListProps) {

  if(isLoading) return (
    <Box sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1.5rem",
      padding: "8rem"
    }}>
      {[...Array(10)].map((_, index) => (
   <Box 
      key={index}
      sx={{
      width: 275,
      height: 275,
      bgcolor: 'white',
      padding: '1rem'
      }}
    >
    <Skeleton animation="wave" variant="rectangular" width={243} height={124} sx={{bgcolor: 'grey.300', marginTop: '16px'}} />
    <Skeleton animation="wave" variant="rectangular" width={218} height={35} sx={{bgcolor: 'grey.300', marginTop: '16px'}} />
    <Skeleton animation="wave" variant="rectangular" width={188} height={30} sx={{bgcolor: 'grey.300', marginTop: '16px'}} />
  </Box>
))}
    

    </Box>
  )

  return (
    <Box sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1.5rem",
      padding: "8rem"
    }}>
      {!isLoading && people[currentPage]?.map(person => (
        <PersonCard key={person?.name} person={person} onClickAction={handleOpenModal} />
      ))}
    </Box>
  )
}