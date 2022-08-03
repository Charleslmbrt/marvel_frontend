import { useState, useEffect } from "react";
import axios from "axios";

const Characters = () => {
  const [dataCharacters, setDataCharacters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          "https://marvel-backend-cl.herokuapp.com/characters"
        );
        setDataCharacters(response.data.results);

        setIsLoading(false);
      } catch (error) {
        console.log("error.message");
      }
    };
    fetchCharacters();
  }, []);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="main-characters">
      <div className="container-characters">
        <div className="header-characters">
          <div className="title">
            <p>Characters</p>
          </div>
        </div>
        <div className="content-characters">
          {dataCharacters.map((character, index) => {
            console.log({ character });
            return (
              <div key={index} className="card-character">
                <div className="card-picture-character">
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt=""
                  />
                </div>
                <div className="card-infos-character">
                  <div className="card-name-character">{character.name}</div>
                  <div className="card-description-character">
                    {character.description}
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
