import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Character = () => {
  const { characterId } = useParams();
  const [dataCharacter, setDataCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-cl.herokuapp.com/comics/${characterId}`
        );
        setDataCharacter(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error.message");
      }
    };
    fetchCharacters();
  }, [characterId]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="main-character">
      {dataCharacter.comics.map((comic, index) => {
        return <div>{comic.title}</div>;
      })}
    </div>
  );
};

export default Character;
