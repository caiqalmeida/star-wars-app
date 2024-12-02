import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import stormtrooperImage from '../assets/stormtrooper.png'
import { Person } from '../types/swapi';

interface PersonCardProps {
  person: Person;
  onClickAction: (person: Person) => void;
}

export function PersonCard({person, onClickAction} : PersonCardProps) {

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onClickAction(person)
  }

  return (
    <Box sx={{ 
      minWidth: 275, 
      maxWidth: 200, 
      height: 275,
      transition: ".2s all ease", 
      cursor: "pointer",
      ':hover': {
      boxShadow: 5,
      transform: "scale(1.1)"
      },
     }}
     onClick={handleClick}
     >
      <Card variant="outlined">
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', marginTop: "1rem", }}
        image={stormtrooperImage}
        title="Storm Trooper"
      />
        <CardContent>
          <Typography variant="h5" component="div">
            {person.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClickAction}>See details</Button>
        </CardActions>
      </Card>
    </Box>
  );
}