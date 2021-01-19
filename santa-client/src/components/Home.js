import "../styles/pages/home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>North Pole Post</h1>

      <div className="timer">
        <h4> Time Till Christmas</h4>
        <h5>1D 5Hrs 3Mins</h5>
      </div>

      <div className="row p-0 m-0">
        <div className="col p-0 m-0">
          <div className="row row-cols-2 p-0 m-0">
            <Link to="/" className="activity">
              <div className="col">
                <div className="d-flex flex-column">
                  <h5 className="center-fix">Secret Santa</h5>
                  <img
                    className="present"
                    src={window.location.origin + "/images/present4.jpg"}
                    alt="present"
                  />
                </div>
              </div>
            </Link>

            <div className="col"></div>
            <div className="col"></div>

            <Link to="/gift-list" className="activity">
              <div className="col">
                <div className="d-flex flex-column">
                  <h5 className="center-fix">Gift List</h5>
                  <img
                    className="present"
                    src={window.location.origin + "/images/present4.jpg"}
                    alt="present"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="col p-0 m-0">
          <img
            className="tree"
            alt="Christmas Tree"
            src={window.location.origin + "/images/tree.png"}
          />
        </div>

        <div className="col p-0 m-0">
          <div className="row row-cols-2 p-0 m-0">
            <div className="col"></div>

            <Link to="/advent-calender" className="activity">
              <div className="col">
                <div className="d-flex flex-column">
                  <h5 className="center-fix">Advent Calender</h5>
                  <img
                    className="present"
                    src={window.location.origin + "/images/present4.jpg"}
                    alt="present"
                  />
                </div>
              </div>
            </Link>

            <Link to="/Letter-to-Santa" className="activity">
              <div className="col">
                <div className="d-flex flex-column">
                  <h5 className="center-fix">Letter To Santa</h5>
                  <img
                    className="present"
                    src={window.location.origin + "/images/present4.jpg"}
                    alt="present"
                  />
                </div>
              </div>
            </Link>

            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
