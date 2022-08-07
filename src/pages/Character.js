import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import notFoundMarvelComics from "../assets/img/notfound-marvel-comics.jpg";

//import component
import Loader from "../components/Loader";

const Character = () => {
  const { characterId } = useParams();
  const [dataCharacter, setDataCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
    <Loader />
  ) : (
    <div className="main-character">
      <div className="slider-character">
        <div className="content-slider-character">
          <h1 className="title">{dataCharacter.name}</h1>

          {dataCharacter.description ? (
            <p className="description">{dataCharacter.description}</p>
          ) : (
            <>
              <p className="description">
                All about your favorite hero{" "}
                <strong>{dataCharacter.name}</strong>.
              </p>
            </>
          )}
        </div>

        <img
          src={`${dataCharacter.thumbnail.path}.${dataCharacter.thumbnail.extension}`}
          alt=""
        />
      </div>

      <div className="container-character">
        <div className="content-character">
          <div className="content-img-character">
            <div className="img-character">
              <img
                src={`${dataCharacter.thumbnail.path}.${dataCharacter.thumbnail.extension}`}
                alt=""
              />
            </div>
          </div>

          <div className="comics-character">
            <p className="title-card-comics-character">
              Follow my adventures in these comics
            </p>

            <div className="card-comics-character">
              <div className="main-card-comics-character-carousel">
                <ReactSimplyCarousel
                  activeSlideIndex={activeSlideIndex}
                  onRequestChange={setActiveSlideIndex}
                  itemsToShow={1}
                  itemsToScroll={1}
                  forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                      alignSelf: "center",
                      background: "black",
                      border: "none",
                      borderRadius: "50%",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "20px",
                      height: 30,
                      lineHeight: 1,
                      textAlign: "center",
                      width: 30,
                    },
                    children: <span>{`>`}</span>,
                  }}
                  backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                      alignSelf: "center",
                      background: "black",
                      border: "none",
                      borderRadius: "50%",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "20px",
                      height: 30,
                      lineHeight: 1,
                      textAlign: "center",
                      width: 30,
                    },
                    children: <span>{`<`}</span>,
                  }}
                  responsiveProps={[
                    {
                      itemsToShow: 4,
                      itemsToScroll: 4,
                    },
                  ]}
                  speed={400}
                  easing="linear"
                >
                  {dataCharacter.comics.map((comic, index) => {
                    const pictureCharacter = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
                    return (
                      <div key={index} className="main-carousel-comics">
                        <div className="container-carousel-comics">
                          {pictureCharacter.includes("image_not_available") ? (
                            <img src={notFoundMarvelComics} alt=""></img>
                          ) : (
                            <img
                              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                              alt=""
                            />
                          )}
                        </div>

                        <p className="title-carousel-comics">{comic.title}</p>
                      </div>
                    );
                  })}
                </ReactSimplyCarousel>
              </div>
            </div>
            {/* //fin de card-comics-character */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
