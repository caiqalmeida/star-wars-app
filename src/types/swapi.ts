export type Person = {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
  homeworld: string;
  films: string[];
  starships: Starship[] | [];
  species: Specie[] | [];
}

export type Planet = {
  name: string;
  terrain: string;
  climate: string;
  population: string;
  url: string;
}

export type Specie = {
  name: string;
  url: string;
}

export type Starship = {
  name: string;
  url: string;
}