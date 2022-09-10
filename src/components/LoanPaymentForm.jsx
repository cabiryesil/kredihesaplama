import React, { useContext, useState } from "react";
import { LoanContext } from "./LoanPaymentContext";
import "./LoanPaymentForm.css";

function LoanPaymentForm() {
  const { dispatch } = useContext(LoanContext);

  const [formData, setFormData] = useState({
    amount: "100000",
    np: "12",
    kkdf: "15",
    bsmv: "10",
    rate: "2.28",
    interval: "1",
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const amount = Number(formData.amount);
    const kkdf = Number(formData.kkdf);
    const bsmv = Number(formData.bsmv);
    const n = Number(formData.np);
    let rate = Number(formData.rate);

    if (formData.interval === "0") rate /= 4;
    else if (formData.interval === "2") rate *= 12;

    if (amount < n) return false;

    const brutFaiz = (rate + (rate * bsmv) / 100 + (rate * kkdf) / 100) / 100;

    let payment = Number(
      (
        ((Math.pow(1 + brutFaiz, n) * brutFaiz) /
          (Math.pow(1 + brutFaiz, n) - 1)) *
        amount
      ).toFixed(2)
    );

    const output = [];
    let totalPayment = 0;

    for (let i = 0; i < n; i++) {
      let _para = i === 0 ? amount : output[i - 1].balance,
        _rate = Number(((_para * rate) / 100).toFixed(2)),
        _kkdf = Number((_rate * (kkdf / 100)).toFixed(2)),
        _bsmv = Number((_rate * (bsmv / 100)).toFixed(2)),
        _principal = Number((payment - (_rate + _bsmv + _kkdf)).toFixed(2)),
        _balance = Number((_para - _principal).toFixed(2));

      if (Math.floor(_balance) === 0 || _balance < 0) {
        payment += _balance;
        _principal = Number((payment - (_rate + _bsmv + _kkdf)).toFixed(2));
        _balance = Number((_para - _principal).toFixed(2));
      }

      const data = {
        payment: payment.toFixed(2),
        rate: _rate.toFixed(2),
        kkdf: _kkdf.toFixed(2),
        bsmv: _bsmv.toFixed(2),
        principal: _principal.toFixed(2),
        balance: _balance.toFixed(2),
      };

      totalPayment += payment;
      output.push(data);
    }

    dispatch({
      type: "DATA_RESULT",
      payload: {
        loanPaymentData: output,
        totalPayment: totalPayment.toFixed(2),
        payment: output[0].payment,
      },
    });
  };

  const amountChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        amount: e.target.value,
      };
    });
  };
  const npChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        np: e.target.value,
      };
    });
  };
  const kkdfChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        kkdf: e.target.value,
      };
    });
  };
  const bsmvChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        bsmv: e.target.value,
      };
    });
  };
  const rateChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        rate: e.target.value,
      };
    });
  };
  const intervalChangeHandler = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        interval: e.target.value,
      };
    });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="row col-sm-6">
        <div className="form-group">
          <label>Kredi Miktarı</label>
          <input
            type="number"
            value={formData.amount}
            min="0"
            step="1"
            onChange={amountChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label>Taksit Sayısı</label>
          <input
            type="number"
            value={formData.np}
            min="3"
            step="1"
            onChange={npChangeHandler}
            required
          />
        </div>
      </div>
      <div className="row col-sm-6">
        <div className="form-group">
          <label>KKDF</label>
          <input
            type="number"
            name="kkdf"
            value={formData.kkdf}
            min="0"
            step="any"
            onChange={kkdfChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label>BSMV</label>
          <input
            type="number"
            value={formData.bsmv}
            min="0"
            step="any"
            onChange={bsmvChangeHandler}
            required
          />
        </div>
      </div>
      <div className="row col-sm-6">
        <div className="form-group">
          <label>Faiz</label>
          <input
            type="number"
            value={formData.rate}
            min="0.1"
            step="any"
            onChange={rateChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label>Taksit Aralığı</label>
          <select
            value={formData.interval}
            onChange={intervalChangeHandler}
            required
          >
            <option value="0">Haftalık</option>
            <option value="1">Aylık</option>
            <option value="2">Yıllık</option>
          </select>
        </div>
      </div>
      <div className="row">
        <button type="submit" className="btn-submit">
          HESAPLA
        </button>
      </div>
    </form>
  );
}

export default LoanPaymentForm;
