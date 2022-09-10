import "./App.css";
import LoanPayment from "./components/LoanPayment";
import LoanPaymentContext from "./components/LoanPaymentContext";
import ModalWrapper from "./components/Modal/ModalContext";

function App() {
  return (
    <LoanPaymentContext>
      <ModalWrapper>
        <LoanPayment />
      </ModalWrapper>
    </LoanPaymentContext>
  );
}

export default App;
