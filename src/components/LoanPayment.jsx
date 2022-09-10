import React from "react";
import LoanPaymentForm from "./LoanPaymentForm";

import "./LoanPayment.css";
import LoanPaymentResult from "./LoanPaymentResult";

function LoanPayment() {
  return (
    <LoanPaymentContent>
      <h2 className="title">Kredi Hesaplama Aracı</h2>
      <LoanPaymentResult />
      <LoanPaymentForm />
    </LoanPaymentContent>
  );
}

const LoanPaymentContent = ({ children }) => {
  return (
    <div className="loan-payment">
      <div className="loan-payment-inner">
        <div className="loan-payment-content">{children}</div>
      </div>
    </div>
  );
};

export default LoanPayment;
