import "../styles/App.scss";
import firtsData from "../data/data.json";
import { useState } from "react";

function App() {
  const [data, setData] = useState(firtsData);
  const [newPhrase, setNewPhrase] = useState({
    quote: "",
    character: "",
  });
  const [search, setSearch] = useState("");

  const handleNewPhrase = (ev) => {
    setNewPhrase({
      ...newPhrase,
      [ev.target.id]: ev.target.value,
    });
  };

  const handleBtn = (ev) => {
    ev.preventDefault();
    setData([...data, newPhrase]);
    setNewPhrase({
      quote: "",
      character: "",
    });
  };
  const handleFilter = (ev) => {
    setSearch(ev.target.value);
  };

  const htmlData = data
    //.filter((phrase) => {
    //phrase.quote.toLocaleLowerCase().includes(search);
    //})
    .map((phrase, index) => {
      return (
        <li className="eachPhrase" key={index}>
          <p>{phrase.quote}</p>
          <p className="character">{phrase.character}</p>
        </li>
      );
    });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frases de Friends</h1>
      </header>
      <main>
        <form>
          <input
            className="newPhrase"
            type="text"
            name="character"
            id="character"
            placeholder="Filtrar por Frase"
            value={search}
            onChange={handleFilter}
          />
        </form>
        <ul>{htmlData}</ul>
        <form className="form">
          <h2> Añadir una nueva frase</h2>
          <input
            className="newPhrase"
            type="text"
            name="quote"
            id="quote"
            placeholder="Frase"
            value={newPhrase.quote}
            onChange={handleNewPhrase}
          />
          <input
            className="newPhrase"
            type="text"
            name="character"
            id="character"
            placeholder="Personaje"
            value={newPhrase.character}
            onChange={handleNewPhrase}
          />
          <input
            className="btn"
            type="submit"
            value="Añadir nueva frase"
            onClick={handleBtn}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
