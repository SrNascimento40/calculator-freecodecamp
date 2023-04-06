import React from "react";
import { ACTIONS } from "./App";

export default function DigitButton({ dispatch, digit, buttonId}) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      id={buttonId}
    >
      {digit}
    </button>
  );
}
