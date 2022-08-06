import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import notFoundMarvel from "../assets/img/notfound-marevel.jpg";
import bgMarvel from "../assets/img/bg-marvel.jpeg";

const Comics = () => {
  const [dataComics, setDataComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const comicsPerPage = 12;
  const numberOfComicsVisited = page * comicsPerPage;

  const totalPages = Math.ceil(dataComics?.length / comicsPerPage);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-cl.herokuapp.com/comics?title=${search}`
        );
        setDataComics(response.data.results);

        setIsLoading(false);
      } catch (error) {
        console.log("error.message");
      }
    };
    fetchComics();
  }, [search]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <div className="main-comics">
      <div className="slider-comics">
        <img src={bgMarvel} alt="" />
      </div>
      <div className="container-comics">
        <div className="header-comics">
          <div className="title">
            <h1>Comics</h1>
            <p>A WORLD OF COMICS AWAITS.</p>
          </div>
          <div className="search-comics">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="content-comics">
          {dataComics
            .slice(numberOfComicsVisited, numberOfComicsVisited + comicsPerPage)
            .map((comic, index) => {
              const pictureComics = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              return (
                <div key={index} className="card-comic">
                  <div className="card-picture-comic">
                    <div className="content-card-picture-comic">
                      {pictureComics.includes("image_not_available") ? (
                        <img src={notFoundMarvel} alt=""></img>
                      ) : (
                        <img
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="card-infos-comic">
                    <div className="card-name-comic">
                      <h1>{comic.title}</h1>
                    </div>
                    {/* <div className="card-description-comic">
                      <p>{comic.description}</p>
                    </div> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName={"navigationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"navigationDisabled"}
          activeClassName={"navigationActive"}
        />
      </div>
    </div>
  );
};

export default Comics;
