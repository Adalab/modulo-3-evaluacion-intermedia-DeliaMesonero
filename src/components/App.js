import "../styles/App.scss";
//import firtsData from "../data/data.json";
import { useEffect, useState } from "react";
import getDataApi from "../services/fetch";

function App() {
  const [data, setData] = useState([]);
  const [newPhrase, setNewPhrase] = useState({
    quote: "",
    character: "",
  });
  const [search, setSearch] = useState("");
  const [filterChar, setFilterChar] = useState("all");

  useEffect(() => {
    getDataApi().then((data) => {
      setData(data);
    });
  });

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
  const handleFilterChar = (ev) => {
    setFilterChar(ev.target.value);
  };
  const htmlData = data
    .filter((phrase) => {
      return phrase.quote.toLowerCase().includes(search.toLowerCase());
    })
    .filter((item) => {
      if (filterChar === "all") {
        return true;
      }
      return item.character === filterChar;
    })
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
          <label htmlFor="character">
            {" "}
            Filtrar por Frase
            <input
              className="newPhrase"
              type="text"
              name="character"
              id="character"
              placeholder="Filtrar por Frase"
              value={search}
              onChange={handleFilter}
            />
          </label>
          <label htmlFor="character">
            Filtrar por Personaje
            <select onChange={handleFilterChar} value={filterChar}>
              <option value="all">Todos</option>
              <option value="Ross">Roos</option>
              <option value="Rachel">Rachel</option>
              <option value="Joey">Joey</option>
              <option value="Phoebe">Phoebe</option>
              <option value="Chendler">Chendler</option>
            </select>
          </label>
        </form>
        <ul>{htmlData}</ul>
        <form className="form">
          <h2> Añadir una nueva frase</h2>
          <label htmlFor="quote">
            {" "}
            Frase
            <input
              className="newPhrase"
              type="text"
              name="quote"
              id="quote"
              placeholder="Frase"
              value={newPhrase.quote}
              onChange={handleNewPhrase}
            />
          </label>
          <label htmlFor="character">
            {" "}
            Personaje
            <input
              className="newPhrase"
              type="text"
              name="character"
              id="character"
              placeholder="Personaje"
              value={newPhrase.character}
              onChange={handleNewPhrase}
            />
          </label>

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
