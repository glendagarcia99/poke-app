import "./styles.css";
import React,{useEffect,useState} from "react";
import Navbar from './componentes/Navbar';
import PokemonSearch from "./componentes/PokemonSearch";
import Pokedex from "./componentes/Pokedex";
import {getPokemons,getPokemonData, searchPokemon } from "./api";


function App() { 
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);


  const fetchPokemons = async () =>{
    try {
      setLoading(true)
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false)
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
      
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() =>{
    if (!searching) {
      fetchPokemons();
    }
    
  },[page])

  const onSearch = async(pokemon) =>{
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);

    const result = await searchPokemon(pokemon)
    if (!result) {
      setNotFound(true)
      setLoading(false)
      return;
    }else{
      setPokemons([result])
      setPage(0);
      setTotal(1);
    }
    
    setLoading(false);
    setSearching(false);
  }
  return (
    <div>
      <Navbar />
      <div className='App'>
        <PokemonSearch onSearch={onSearch}/>
          {notFound?
          <div className="Not-found-text"> No se encontró el pokemon que buscabas😭</div>
          :
          <Pokedex 
          loading={loading}
          pokemons={pokemons} 
          page={page}
          setPage={setPage}
          total={total}
          />
        }
        
      </div>
    </div>
    
  )
}

export default App;
