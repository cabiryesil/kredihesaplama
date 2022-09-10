import { createContext, useReducer } from "react";

const LoanContext = createContext("");

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RESULT":
      return action.payload;
    default:
      return state;
  }
}

function LoanPaymentContext({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    loanPaymentData: null,
  });

  return (
    <LoanContext.Provider value={{ state, dispatch }}>
      {children}
    </LoanContext.Provider>
  );
}

export default LoanPaymentContext;
export { LoanContext };
