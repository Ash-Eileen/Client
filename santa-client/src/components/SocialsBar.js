import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/pages/socials.scss";

const SocialsBar = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div>
          <FontAwesomeIcon className="social" icon={faFacebookSquare} />
          <FontAwesomeIcon className="social" icon={faInstagramSquare} />
          <FontAwesomeIcon className="social" icon={faGithubSquare} />
        </div>

        <p className="mb-1">Created by Santas Helpers Ash & Jordon</p>
      </div>
    </div>
  );
};

export default SocialsBar;
