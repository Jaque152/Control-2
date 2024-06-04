import React, { useState, } from 'react';

const ChuckNorrisFacts = () => {
  const [search, setSearch] = useState(''); // Almacenar el input de texto
  const [facts, setFacts] = useState([]);   // Almacenar los resultados
  const [error, setError] = useState(null); //Almacenar errores
  const [favorites, setFavorites] = useState([]); //Almacenar Favoritos
  const [showFavorites, setShowFavorites] = useState(false);  //Ver Favoritos

  const fetchFacts = async () => {
    try {
      const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${search}`);
      if (response.ok) {
        const data = await response.json();// si la respuesta es exitosa, se convierte en formato json
        setFacts(data.result);//se almacena el json y se muestran los resultados
        setError(null);
      } else {
        setError('Not Found Facts');
        alert('Not Found Facts');
      }
    } catch (error) {
      setError('Error');
      alert('Error')
    }
  };

  const submit = (e) => {
    e.preventDefault();
    fetchFacts();
  };

  const clearResults = () => {
    setFacts([]); // Limpia la lista de facts.
    setError(null); // Limpia el mensaje de error.
  };

  const addToFavorites = (fact) => {
    if (!favorites.some(favorite => favorite.id === fact.id)) {
      setFavorites([...favorites, fact]); // Añade el fact a la lista de favoritos si no está ya en la lista.
    } 
  };

  const clearFavorites = () => {
    setFavorites([]); // Limpia la lista de favoritos.
  };

  return (
    <div>
      <h1>Chuck Norris Facts</h1>
      <form onSubmit={submit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <button type="submit">Search</button>{/* Botón "Search" */}
        <button type="button" onClick={clearResults}>Limpiar Resultados</button> {/* Botón "Limpiar Resultados" */}
      </form>
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? 'Ocultar mis favoritos' : 'Ver mis favoritos'}
      </button>
      
      {error && <p>{error}</p>}
      {!showFavorites && (
        <ul>
          {facts.map((fact) => (
            <li key={fact.id}>
              <p><strong>Fact:</strong> {fact.value}</p>
              <p><strong>Created At:</strong> {new Date(fact.created_at).toLocaleDateString()}</p>
              {fact.categories.length > 0 && (
                <p><strong>Categories:</strong> {fact.categories.join(', ')}</p>
              )}
              <button onClick={() => addToFavorites(fact)}>Me gusta</button> {/* Botón "Me gusta" */}
            </li>
          ))}
        </ul>
      )}  
      {showFavorites && (
        <div>
          <h2>Favoritos</h2>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                <p><strong>Fact:</strong> {favorite.value}</p>
                <p><strong>Created At:</strong> {new Date(favorite.created_at).toLocaleDateString()}</p>
                {favorite.categories.length > 0 && (
                  <p><strong>Categories:</strong> {favorite.categories.join(', ')}</p>
                )}
              </li>           
            ))}
          </ul>
          <ul>
            <button onClick={clearFavorites}>Borrar Favoritos</button> {/* Botón "Borrar Favoritos" */} 
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChuckNorrisFacts;

