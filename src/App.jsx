import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      if (state.currentOperand == "0") {
        return {
          currentOperand: `${payload.digit}`,
        };
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {
        currentOperand: "0",
        previousOperand: null,
        operation: null,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

    case ACTIONS.EVALUATE:
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "0";

  let cumputation = "";
  switch (operation) {
    case "+":
      cumputation = prev + current;
      break;

    case "-":
      cumputation = prev - current;
      break;

    case "*":
      cumputation = prev * current;
      break;

    case "÷":
      cumputation = prev / current;
      break;
  }
  return cumputation;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand" id="display">
          {currentOperand}
        </div>
      </div>
      <button
        className="span-two"
        id="clear"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button
        id="delete"
        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
      >
        DEL
      </button>
      <OperationButton operation="÷" buttonId="divide" dispatch={dispatch} />
      <DigitButton digit="1" buttonId="one" dispatch={dispatch} />
      <DigitButton digit="2" buttonId="two" dispatch={dispatch} />
      <DigitButton digit="3" buttonId="three" dispatch={dispatch} />
      <OperationButton operation="*" buttonId="multiply" dispatch={dispatch} />
      <DigitButton digit="4" buttonId="four" dispatch={dispatch} />
      <DigitButton digit="5" buttonId="five" dispatch={dispatch} />
      <DigitButton digit="6" buttonId="six" dispatch={dispatch} />
      <OperationButton operation="+" buttonId="add" dispatch={dispatch} />
      <DigitButton digit="7" buttonId="seven" dispatch={dispatch} />
      <DigitButton digit="8" buttonId="eight" dispatch={dispatch} />
      <DigitButton digit="9" buttonId="nine" dispatch={dispatch} />
      <OperationButton operation="-" buttonId="subtract" dispatch={dispatch} />
      <DigitButton digit="." buttonId="decimal" dispatch={dispatch} />
      <DigitButton digit="0" buttonId="zero" dispatch={dispatch} />
      <button
        className="span-two"
        id="equals"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
