import { useEffect, useState } from "react";
import { getPeople } from "./services/swapi";
import { Box, Button, Typography } from "@mui/material";
import { PersonModal } from "./components/PersonModal";

import { Person } from "./types/swapi";
import { PersonList } from "./components/PersonList";

import StarWarsImage from './assets/star-wars-lettering.png'

function App() {

  const [people, setPeople] = useState<[[Person]] | []>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)

  const [open, setOpen] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const handleOpen = (person: Person) => {
    setOpen(true)
    setSelectedPerson(person)
  };

  const handleClose = () => {
    setOpen(false)
    setSelectedPerson(null)
  };

  useEffect(() => {
    fetchPeople(1);
  }, []);


  const fetchPeople = async (page: number) => {
    try {

      if(people[page]?.length > 0) {
        setCurrentPage(page)
        return 
      }

      setIsLoadingPeople(true)

      const { results: fetchedPeople, next, previous } = await getPeople({page});
      const newPeople: [[Person]] | [] = [...people];
      newPeople[page] = fetchedPeople;
      setHasPreviousPage(!!previous)
      setHasNextPage(!!next)
      setCurrentPage(page)
      setPeople(newPeople);
      setIsLoadingPeople(false)
    } catch (error) {
      console.error('Error fetching people:', error);
      setIsLoadingPeople(false)
    }
  };

  const handleChangePage = (pageSum: number) => {
    fetchPeople(currentPage+pageSum)
  }

  return (
    <div>
      <img src={StarWarsImage} width={250} style={{ display: "block", margin: "2rem auto 1rem"}} />
      <PersonList currentPage={currentPage} handleOpenModal={handleOpen} isLoading={isLoadingPeople} people={people} />
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
      {selectedPerson && <PersonModal open={open} handleClose={handleClose} person={selectedPerson} />}

    </div>
  );
}

export default App
