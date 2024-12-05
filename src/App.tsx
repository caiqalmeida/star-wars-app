import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { getPeople, getSearch } from "./services/swapi";

import { PersonModal } from "./components/PersonModal";
import { PersonList } from "./components/PersonList";
import { PersonSearch } from "./components/PersonSearch";
import { PersonPagination } from "./components/PersonPagination";

import { Person } from "./types/swapi";

import StarWarsImage from './assets/star-wars-lettering.png'

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSearch, setisLoadingSearch] = useState(false)

  const [people, setPeople] = useState<[Person[]] | []>([]);
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

  const fetchPeople = async (page: number) => {
    try {

      if(people[page]?.length > 0) {
        setCurrentPage(page)
        return 
      }

      setIsLoadingPeople(true)

      const { results: fetchedPeople, next, previous } = await getPeople({page});
      const newPeople: [Person[]] | [] = [...people];
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

  const fetchSearch = async (searchTerm: string) => {
    try {
      setIsSearching(true)
      setisLoadingSearch(true)

      let newPeople: [] | Person[] = [];
      let page = 1;
      
      const fetchPeople = async () => {
        const { results: fetchedPeople, next } : {results: [Person], next: string} = await getSearch({searchTerm, page});
        newPeople = [...newPeople, ...fetchedPeople];
        if(next) {
          page++
          await fetchPeople();
        }
      }

      await fetchPeople()

      setPeople(newPeople);
      setisLoadingSearch(false)
    } catch (error) {
      console.error('Error fetching search:', error);
      setisLoadingSearch(false)
    }
  };

  const clearSearch = () => {
    setSearchTerm('')
    setIsSearching(false)
    fetchPeople(1)
  }

  const handleChangePage = (pageSum: number) => {
    fetchPeople(currentPage+pageSum)
  }

  useEffect(() => {
    fetchPeople(1);
  }, []);

  return (
    <>
      <img src={StarWarsImage} width={250} style={{ display: "block", margin: "2rem auto 1rem"}} />
 
      <PersonSearch onButtonSearchClick={fetchSearch} handleSetSearchTerm={setSearchTerm} searchTerm={searchTerm}  />

      {isSearching && <Button  variant="contained" color="error" sx={{marginBottom: "1.5rem"}} onClick={() => clearSearch()} >Clear search</Button>}

      <PersonList currentPage={currentPage} handleOpenModal={handleOpen} isLoading={isLoadingPeople || isLoadingSearch} people={people} isSearching={isSearching} />

      {!isSearching && (
       <PersonPagination hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} currentPage={currentPage} isLoadingPeople={isLoadingPeople} handleChangePage={handleChangePage} />
      )}
  
      {selectedPerson && <PersonModal open={open} handleClose={handleClose} person={selectedPerson} />}

    </>
  );
}

export default App
