import React from "react";

const Pokemon = (props) =>{
    const {pokemon} = props;
    const style = pokemon.type + "pokemon-card";

    return(
        <div className="pokemon-card">
            <div className="number">
                <small>#{pokemon.id}</small>
            </div>
            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}></img>
            <div className="card-detail">
                <h3>{pokemon.name}</h3>
                <div className="pokemon-type">
                    <small>Type: {pokemon.types.map((type, idx) => {
                            return (
                            <div key={idx} className="pokemon-type-text">
                            {type.type.name}
                            </div>);
                        })}
                    </small>
                </div>
                
            </div>
        </div>
    )
}

export default Pokemon;




    



    

