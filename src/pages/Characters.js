import { useState, useEffect } from "react";
import axios from "axios";

const Characters = () => {
  const [dataCharacters, setDataCharacters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-cl.herokuapp.com/characters?name=${search}`
        );
        setDataCharacters(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("error.message");
      }
    };
    fetchCharacters();
  }, [search]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="main-characters">
      <div className="container-characters">
        <div className="header-characters">
          <div className="title">
            <p>Characters</p>
          </div>
          <div className="search-characters">
            <input
              type="text"
              placeholder="Chercher un personnage"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="content-characters">
          {dataCharacters.map((character, index) => {
            console.log({ character });
            return (
              <div key={index} className="card-character">
                <div className="card-picture-character">
                  <div className="content-card-picture-character">
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt=""
                    />
                  </div>
                </div>
                <did className="divider"></did>
                <div className="card-infos-character">
                  <div className="card-name-character">
                    <p>{character.name}</p>
                  </div>
                  <div className="card-description-character">
                    <p>{character.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
