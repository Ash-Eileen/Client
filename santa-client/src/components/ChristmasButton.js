import { Link } from "react-router-dom";

import "../styles/pages/christmasButton.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChristmasButton = (props) => {
  return (
    <div>
      {props.onClick ? (
        <div
          id={props.id}
          onClick={props.onClick}
          class="christmasButton py-1 px-3"
        >
          {props.text}{" "}
          <FontAwesomeIcon className="candyCane" icon={props.icon} />
        </div>
      ) : (
        <Link to={props.to}>
          <div class="christmasButton py-1 px-3">
            <p> {props.text}</p>{" "}
            <FontAwesomeIcon className="candyCane" icon={props.icon} />
          </div>
        </Link>
      )}
    </div>
  );
};

export default ChristmasButton;
