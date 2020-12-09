import React, {useState, useEffect} from 'react';
import Card from './components/card/card';
import Pagination from './components/pagination';


// export default class Pokedex extends React.Component {
export default function Pokedex() {
  const [pokemones, setPokemones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const [pokemonLimit, setPokemonLimit] = useState(893);
  // } //Hay un máximo de 893 imágenes de Pokemon disponibles y pokemonPerPage debe ser múltiplo de 3


  useEffect(() => {
    // componentDidMount
    const limit = pokemonPerPage;
    const url = 'https://pokeapi.co/api/v2/pokemon';
    //Consumir la API de pokeapi
    const getPokemones = async () => {
      try {
        const response = await fetch(`${url}?limit=${limit}`);
        const data = await response.json();
        await setPokemones(data.results);
      } catch(error) {
          console.log(error.message);
      }
    };
    getPokemones();
  }, []);


  const getNumber = (index) => {
    let id = (index + 1) + ((currentPage - 1) * pokemonPerPage);
    return id;
  }

  const getImage = (id) => {
    let pokemonImg = "";

    if(id < 10){
        pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png`;
    }else if(id >= 10 && id < 100){
        pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png`;
    }else{
        pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    }

    return pokemonImg;
  }

  const fetchPage = (requestPage) => {
    setCurrentPage(requestPage);
    //1. Completar el método para poder obtener los pokemones dependiendo de la página solicitada
    const limit = pokemonPerPage;
    const url = 'https://pokeapi.co/api/v2/pokemon';
    fetch(`${url}?limit=${limit}&offset=${(requestPage - 1) * pokemonPerPage}`)
          .then(response => response.json())
          .then(data => setPokemones(data.results))
          .catch( error => {
            console.log(error);
          })
  };

  const updatePokemonPerPage = (event) => {
    const newValue = parseInt(event.target.value);
    setPokemonPerPage(newValue);
    // event.preventDefault();
  };


  return (
    <div className="contains-all">
      <div className="above-container">
        <div className="container">
          <div className="pokedex-container">
            {                
              pokemones.map( (pokemon, index) => {      
                //2. Solucionar el problema de obtener las imagenes de los pokemones con id < 10, > 10, > 100
                const pokemonNumber = getNumber(index);
                const pokemonImg = getImage(pokemonNumber); // Se usaba index
                
                return (
                  <Card key={index + 1} number={pokemonNumber} name={pokemon.name} img={pokemonImg}  />
                );
              })
            }
          </div>
          <div className="pokedex-pagination">
            <Pagination currentPage={currentPage} pokemonPerPage={pokemonPerPage} pokemonLimit={pokemonLimit} fetchPageFn={fetchPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
