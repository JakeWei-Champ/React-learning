import React from "react";
import { useState, useEffect } from "react";
import "./index.css";


function Card(props) {
  const [likes, setlikes] = useState(0);
  return (
    <div class="card col-4 d-flex justify-content-center">
      <img src={props.src} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{props.title}</h5>
        {likes === 0 ? null : <p class="card-text">likes {likes}</p>}
        {likes === 10 ? null :
          <button onClick={() => { setlikes(likes + 1) }} class="btn btn-primary">{props.buttonText}</button>
        }
        {/* {console.log(props.src)} */}
      </div>
    </div>
  )
}


function geturl(pokemon) {
  return pokemon.url.replace(
    "https://pokeapi.co/api/v2/pokemon/", ""
  ).replace("/", "");
}

function App() {
  const [pokelist, setpokelist] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [loader, setloader] = useState(false);
  useEffect(() => {
    setloader(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit${limit}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setloader(false);
        setpokelist([...pokelist, ...json["results"]]);
      })
      // eslint-disable-next-line
  }, [offset])
  return (
    <div className="App">
      <div class="container">
      </div>
      <div class="container">
        <div class="row">
          {pokelist.map(pokemon => {
            return (
              <Card
                title={pokemon["name"]}
                text="gg"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${geturl(pokemon)}.png`}
                buttonText="click"
              />
            )
          })}
        </div>
        {loader === true ? <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>  : null}
        <div>
        <button  onClick={() => { setOffset(offset + limit) }}> More </button>
        </div>
      </div>
    </div>
  );
}


export default App;
