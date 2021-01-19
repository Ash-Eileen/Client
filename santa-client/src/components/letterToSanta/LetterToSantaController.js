import { useGlobalState } from "../../config/store";
import LetterToSantaParent from "./LetterToSantaParent";
import LetterToSantaChild from "./LetterToSantaChild";
import React, { useEffect } from "react";

const LetterToSantaController = () => {
  const { store, dispatch } = useGlobalState();
  const { letterToSanta } = store;

  // useEffect(() => {
  //   letterToSanta.addForm = false;

  //   dispatch({
  //     type: "setLetterToSanta",
  //     data: letterToSanta,
  //   }); 

  // }, letterToSanta.parentMode === false); 

  useEffect(() => {
    letterToSanta.addForm = false;

    dispatch({
      type: "setLetterToSanta",
      data: letterToSanta,
    }); 
    
  }, [dispatch,letterToSanta]);

  return (
    <div>
      <h1>LetterToSanta</h1>
      {letterToSanta.parentMode ? (
        <LetterToSantaParent />
      ) : (
        <LetterToSantaChild />
      )}
    </div>
  );
};

export default LetterToSantaController;
