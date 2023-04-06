import React from "react";
import { ACTIONS } from "./App";

export default function OperationButton({ dispatch, operation, buttonId }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
      id={buttonId}
    >
      {operation}
    </button>
  );
}
