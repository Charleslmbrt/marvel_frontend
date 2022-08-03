import { Link } from "react-router-dom";
import marvelLogo from "../assets/img/marvel-logo.svg";

const Header = () => {
  return (
    <header>
      <div className="main-header">
        <div className="container-header">
          {/* <div className="search">
            <input type="text" spaceholder="Recherche"></input>
          </div> */}
          <div className="logo">
            <img src={marvelLogo} alt="Logo Marvel" />
          </div>
          {/* <div className="connexion">
            <div className="sign-in">
              <button>Sign in</button>
            </div>
            <div className="join">
              <button>Join</button>
            </div>
          </div> */}
        </div>
      </div>

      <div className="main-menu">
        <div className="container-menu">
          <ul>
            <Link to="/characters">
              <li>Characters</li>
            </Link>
            <Link to="/comics">
              <li>Comics</li>
            </Link>
            <Link to="favorites">
              {" "}
              <li>Favorites</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
