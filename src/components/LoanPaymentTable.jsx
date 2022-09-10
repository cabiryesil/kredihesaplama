import React, { useContext } from "react";
import { LoanContext } from "./LoanPaymentContext";

import "./LoanPaymentTable.css";

function LoanPaymentTable() {
  const { state } = useContext(LoanContext);
  return (
    <div className="loan-payment-table">
      <div className="responsive-table">
        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>Taksit No</th>
              <th>Taksit Tutarı</th>
              <th>Ana Para</th>
              <th>Kalan Ana Para</th>
              <th>Kar Tutarı</th>
              <th>KKDF</th>
              <th>BSMV</th>
            </tr>
          </thead>
          <tbody>
            {state.loanPaymentData.map((data, index) => (
              <tr key={Math.random()}>
                <td>{index + 1}</td>
                <td>{data.payment}</td>
                <td>{data.principal}</td>
                <td>{data.balance}</td>
                <td>{data.rate}</td>
                <td>{data.kkdf}</td>
                <td>{data.bsmv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoanPaymentTable;
