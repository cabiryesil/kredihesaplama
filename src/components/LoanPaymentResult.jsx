import React, { useContext } from "react";
import { LoanContext } from "./LoanPaymentContext";
import { ModalContext } from "./Modal/ModalContext";

import "./LoanPaymentResult.css";
import LoanPaymentTable from "./LoanPaymentTable";
import { ModalBody, ModalHeader } from "./Modal/Modal";

function LoanPaymentResult() {
  const { state } = useContext(LoanContext);
  const modal = useContext(ModalContext);

  const showDetailTableHandler = () => {
    modal.current.open({
      child: (
        <>
          <ModalHeader title="Kredi Geri Ödeme Tablosu" />
          <ModalBody>
            <LoanPaymentTable />
          </ModalBody>
        </>
      ),
    });
  };

  if (state.loanPaymentData) {
    var formatter = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
    return (
      <div className="lpr">
        <div className="lpr-inner">
          <Item
            title="Toplam Ödenecek Tutar:"
            text={`${formatter.format(state.totalPayment)}`}
          />
          <Item
            title="Taksit Tutarı:"
            text={`${formatter.format(state.payment)}`}
          />
          <div className="lpr-show-detail" onClick={showDetailTableHandler}>
            Detaylı ödeme tablosunu görmek için tıklayın.
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

const Item = ({ title, text }) => {
  return (
    <div className="lpr-item">
      <div className="lpr-item-title">{title}</div>
      <div className="lpr-item-text">{text}</div>
    </div>
  );
};

export default LoanPaymentResult;
