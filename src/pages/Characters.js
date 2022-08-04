import { useState, useEffect } from "react";
import axios from "axios";
import bgMarvel from "../assets/img/bg-marvel.jpeg";
import notFoundMarvel from "../assets/img/notfound-marevel.jpg";

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
      <div className="slider-characters">
        <img src={bgMarvel} alt="" />
      </div>
      <div className="container-characters">
        <div className="header-characters">
          <div className="title">
            <h1>Characters</h1>
            <p>
              Get hooked on a hearty helping of heroes and villains from the
              humble House of Marvel!
            </p>
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
            const pictureCharacter = `${character.thumbnail.path}.${character.thumbnail.extension}`;
            return (
              <div key={index} className="card-character">
                <div className="card-picture-character">
                  <div className="content-card-picture-character">
                    {pictureCharacter.includes("image_not_available") ? (
                      <img src={notFoundMarvel} alt=""></img>
                    ) : (
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt=""
                      />
                    )}
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
