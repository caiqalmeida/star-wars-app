import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { getPeople, getPlanets, getSearch, getSpecies, getStarships } from "./services/swapi";

import { PersonModal } from "./components/PersonModal";
import { PersonList } from "./components/PersonList";
import { PersonSearch } from "./components/PersonSearch";
import { PersonPagination } from "./components/PersonPagination";

import { Person, Planet, Specie, Starship } from "./types/swapi";

import StarWarsImage from './assets/star-wars-lettering.png'
import { PersonFilter } from "./components/PersonFilter";

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

  const [filtersData, setFiltersData] = useState({ 
    planets: {},
    species: {},
    starships: {}
  })
  const [isLoadingFiltersData, setIsLoadingFiltersData] = useState(false)

  const handleOpen = (person: Person) => {
    setOpen(true)
    setSelectedPerson(person)
  };

  const handleClose = () => {
    setOpen(false)
    setSelectedPerson(null)
  };

  const fetchPeople = async ({page}: {page: number}) => {
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

  // TO DO: Refactor, ugly
  const fetchFiltersData = async () => {
    try {
      setIsLoadingFiltersData(true)
      const fetchedFiltersData = {
        planets: {},
        species: {},
        starships: {}
      }

      let planets: Planet[] = [];
      let species: Specie[] = [];
      let starships: Starship[] = [];

      let page = 1;

      const fetchPlanets = async () => {

        const { results: fetchedPlanets, next } : {results: Planet[], next: string} = await getPlanets({page});

        planets = [...planets, ...fetchedPlanets];
        if(next) {
          page++
          await fetchPlanets();
        }
      }

      const fetchSpecies = async () => {

        const { results: fetchedSpecies, next } : {results: Specie[], next: string} = await getSpecies({page});

        species = [...species, ...fetchedSpecies];
        if(next) {
          page++
          await fetchSpecies();
        }
      }

      const fetchStarships = async () => {

        const { results: fetchedStarships, next } : {results: Starship[], next: string} = await getStarships({page});

        starships = [...starships, ...fetchedStarships];
        if(next) {
          page++
          await fetchStarships();
        }
      }

      await fetchPlanets()
      page = 1;
      await fetchSpecies()
      page = 1;
      await fetchStarships()

      planets.map((planet) => {
        if (!fetchedFiltersData.planets[planet.url]) {
          fetchedFiltersData.planets[planet.url] = planet.name
        } 
      })

      species.map((specie) => {
        if (!fetchedFiltersData.species[specie.url]) {
          fetchedFiltersData.species[specie.url] = specie.name
        } 
      })

      starships.map((starship) => {
        if (!fetchedFiltersData.starships[starship.url]) {
          fetchedFiltersData.starships[starship.url] = starship.name
        } 
      })
      setIsLoadingFiltersData(false)
      console.log('fetchedFiltersData',fetchedFiltersData)
      setFiltersData(fetchedFiltersData)
    } catch (error) {
      console.error('Error fetching filters data:', error);
      setIsLoadingFiltersData(false)
    }
  }

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

      const formatedNewPeople = newPeople.map((person) => {
        person.homeworld = filtersData.planets[person.homeworld];

        if(person.species.length > 0) {
          person.species.forEach((specie, index) => {
            person.species[index] = filtersData.species[specie]
          })
        }

        if(person.starships.length > 0) {
          person.starships.forEach((starship, index) => {
            person.starships[index] = filtersData.starships[starship]
          })
        }

        return person
      })

      setPeople(formatedNewPeople);
      setisLoadingSearch(false)
    } catch (error) {
      console.error('Error fetching search:', error);
      setisLoadingSearch(false)
    }
  };

  // TO DO: Refactor, should filter when not searching too
  const handleFilter = ({planetsTermFilter, speciesTermFilter, starshipsTermFilter} : {planetsTermFilter: string, speciesTermFilter: string, starshipsTermFilter: string}) => {
    const filteredPeople = people.filter(person =>  (person.homeworld.toLowerCase().includes(planetsTermFilter.toLowerCase()) || !planetsTermFilter) && (person.species.some(specie => specie.toLowerCase().includes(speciesTermFilter.toLowerCase())) || !speciesTermFilter ) && (person.starships.some(starship => starship.toLowerCase().includes(starshipsTermFilter.toLowerCase())) || !starshipsTermFilter ))

    setPeople(filteredPeople)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setIsSearching(false)
    fetchPeople({page: 1})
  }

  const handleChangePage = (pageSum: number) => {
    fetchPeople({page: currentPage+pageSum})
  }

  useEffect(() => {
    fetchPeople({page: 1});
    fetchFiltersData()
  }, []);

  return (
    <>
      <img src={StarWarsImage} width={250} style={{ display: "block", margin: "2rem auto 1rem"}} />
 
      <Box sx={{background: "white", padding: "1rem", borderRadius: "4px", m: "2rem 0", display: "inline-block"}}>
        <PersonSearch onButtonSearchClick={fetchSearch} handleSetSearchTerm={setSearchTerm} searchTerm={searchTerm} isLoadingFiltersData={isLoadingFiltersData}  />
        <PersonFilter isLoadingFiltersData={isLoadingFiltersData} onButtonFilterClick={handleFilter} />
      </Box>

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
