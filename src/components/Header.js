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
          <Link to="/">
            <div className="logo">
              <img src={marvelLogo} alt="Logo Marvel" />
            </div>
          </Link>
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
              <li className="button-menu">Characters</li>
            </Link>
            <Link to="/comics">
              <li className="button-menu">Comics</li>
            </Link>

            <li className="button-menu button-favorites">Favorites</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
