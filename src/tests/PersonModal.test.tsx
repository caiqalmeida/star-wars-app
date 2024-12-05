import { render, screen, waitFor } from '@testing-library/react';
import { PersonModal } from '../components/PersonModal';
import { getPlanet } from '../services/swapi';
import { getPersonByName } from '../services/swdatabank';
import { Person } from '../types/swapi';
import { vi } from 'vitest';

vi.mock('../services/swapi', () => ({
  getPlanet: vi.fn(),
}));

vi.mock('../services/swdatabank', () => ({
  getPersonByName: vi.fn(),
}));

describe('PersonModal', () => {
  const person: Person = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    height: '1.72',
    mass: '77',
    films: ['A New Hope', 'The Empire Strikes Back'],
    homeworld: 'https://swapi.dev/api/planets/1/',
    starships: ['https://swapi.dev/api/starships/1/', 'https://swapi.dev/api/starships/2/'],
    species: ['https://swapi.dev/api/species/1/'],
  };

  const mockPlanet = {
    name: 'Tatooine',
    climate: 'arid',
    population: '200000',
    terrain: 'desert',
  };

  const mockPersonAditionalInfo = {
    image: 'https://example.com/luke.jpg',
  };

  test('displays the correct data in the modal', async () => {
    (getPlanet as vi.Mock).mockResolvedValue(mockPlanet);
    (getPersonByName as vi.Mock).mockResolvedValue(mockPersonAditionalInfo);

    render(<PersonModal open={true} handleClose={vi.fn()} person={person} />);

    expect(screen.getByText(person.name)).toBeInTheDocument();

    expect(screen.getByText(`Birth year: ${person.birth_year}`)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${person.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Height: ${person.height}`)).toBeInTheDocument();
    expect(screen.getByText(`Mass: ${person.mass}`)).toBeInTheDocument();
    expect(screen.getByText(`Number of movies: ${person.films.length}`)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockPlanet.name}`)).toBeInTheDocument();
      expect(screen.getByText(`Climate: ${mockPlanet.climate}`)).toBeInTheDocument();
      expect(screen.getByText(`Population: ${mockPlanet.population}`)).toBeInTheDocument();
      expect(screen.getByText(`Terrain: ${mockPlanet.terrain}`)).toBeInTheDocument();
    });

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockPersonAditionalInfo.image);
  });
});
