import { Box, CircularProgress, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Person, Planet } from '../types/swapi';
import { useEffect, useState } from 'react';
import { getPlanet } from '../services/swapi';
import { getPersonByName } from '../services/swdatabank';
import { PersonAditionalInfo } from '../types/swdatabank';

import DefaultImage from '../assets/star-wars-lettering.png'
import { getSWAPIUrlId } from '../utils/url';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black'
};



interface PersonModalProps {
  open: boolean;
  handleClose: () => void;
  person: Person
}

export function PersonModal ({open, handleClose,person} : PersonModalProps) {
  const [planet, setPlanet] = useState<Planet | null>(null)
  const [isLoadingPlanet, setIsLoadingPlanet] = useState(false)

  const [personAditionalInfo, setPersonAditionalInfo] = useState<PersonAditionalInfo | null>(null)
  const [isLoadingPersonAditionalInfo, setIsLoadingPersonAditionalInfo] = useState(false)


  const fetchPlanet = async () => {
    try {
      setIsLoadingPlanet(true)
      const id = getSWAPIUrlId({url: person.homeworld, splitBy: "planets"})
      const fetchedPlanet = await getPlanet({id});
      setPlanet(fetchedPlanet);
      setIsLoadingPlanet(false)
    } catch (error) {
      setIsLoadingPlanet(false)
      console.error('Error fetching people:', error);
    }
  };

  const fetchPersonAditionalData = async () => {
    try {
      setIsLoadingPersonAditionalInfo(true)
      const personAditionalData = await getPersonByName({name: person.name});
      setPersonAditionalInfo(personAditionalData);
      setIsLoadingPersonAditionalInfo(false)
    } catch (error) {
      setIsLoadingPersonAditionalInfo(false)
      console.error('Error fetching people:', error);
    }
  };

  useEffect(() => {
    fetchPlanet()
    fetchPersonAditionalData()
  }, [])

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h3" component="h2">
        {person.name}
      </Typography>
      {isLoadingPersonAditionalInfo && <CircularProgress />}
      {!isLoadingPersonAditionalInfo && (
        <Box sx={{ maxWidth: "400px"}}>
          <img src={personAditionalInfo?.image ?? DefaultImage} />
        </Box>
      )}
      <Typography variant="h6" component="h6" sx={{mt: 3}}>
        Character details
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Birth year: {person.birth_year}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Gender: {person.gender}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Height: {person.height}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Mass: {person.mass}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Number of movies: {person.films.length}
      </Typography>
      <Typography variant="h6" component="h6" sx={{mt: 3}}>
        Homeworld details
      </Typography>
      {isLoadingPlanet && <CircularProgress />}
     { planet && (
      <>
      <Typography sx={{ mt: 2 }}>
        Name: {planet.name}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Climate: {planet.climate}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Population: {planet.population}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Terrain: {planet.terrain}
      </Typography>
      </>
     ) }
    </Box>
  </Modal>
  )
}