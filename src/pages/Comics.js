import { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
  const [dataComics, setDataComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          "https://marvel-backend-cl.herokuapp.com/comics"
        );
        setDataComics(response.data.results);

        setIsLoading(false);
      } catch (error) {
        console.log("error.message");
      }
    };
    fetchComics();
  }, []);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="main-characters">
      <div className="container-characters">
        <div className="header-characters">
          <div className="title">
            <p>Comics</p>
          </div>
        </div>
        <div className="content-characters">
          {dataComics.map((comic, index) => {
            return (
              <div key={index} className="card-character">
                <div className="card-picture-character">
                  <div className="content-card-picture-character">
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="divider"></div>
                <div className="card-infos-character">
                  <div className="card-name-character">
                    <p>{comic.title}</p>
                  </div>
                  <div className="card-description-character">
                    <p>{comic.description}</p>
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

export default Comics;
