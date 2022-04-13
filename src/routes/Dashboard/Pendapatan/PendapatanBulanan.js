import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";
// import { latestTransaction1 } from "../../../components/DataDummy";
import jwtDecode from "jwt-decode";

const PendapatanBulanan = (props) => {
  const [moneyThisMonth, setMoneyThisMonth] = useState();
  const [moneyLastMonth, setMoneyLastMonth] = useState();
  const [earningThisMonth, setEarningThisMonth] = useState(0);
  const [earningLastMonth, setEarningLastMonth] = useState(0);

  const [taxThisMonth, setTaxThisMonth] = useState(0);
  const [taxLastMonth, setTaxLastMonth] = useState(0);

  const [nettThisMonth, setNettThisMonth] = useState(0);
  const [nettLastMonth, setNettLastMonth] = useState(0);

  const sThisMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
  const eThisMonth = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");
  const sLastMonth = moment()
    .subtract(1, "month")
    .startOf("month")
    .format("YYYY-MM-DD HH:mm:ss");
  const eLastMonth = moment()
    .subtract(1, "month")
    .endOf("month")
    .format("YYYY-MM-DD HH:mm:ss");

  useEffect(() => {
    getEarningThisMonth();
  }, []);

  const getEarningThisMonth = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];

    const response = await fetch(
      "https://api.raspi-geek.com/v1/values",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sThisMonth,
          enddate: eThisMonth,
        }),
      }
    );
    const ajson = await response.json();
    console.log("bulanan", ajson);
    setEarningThisMonth(ajson.Records[0][0].stringValue);
    setTaxThisMonth(ajson.Records[0][1].stringValue);
    setNettThisMonth(ajson.Records[0][2].stringValue);

    // setEarningThisMonth2(ajson.Records[1][1].stringValue);
    // setEarningThisMonth3(ajson.Records[2][1].stringValue);
  };

  useEffect(() => {
    getEarningLastMonth();
  }, []);

  const getEarningLastMonth = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];

    const response = await fetch(
      "https://api.raspi-geek.com/v1/values",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sLastMonth,
          enddate: eLastMonth,
        }),
      }
    );
    const ajson = await response.json();
    setEarningLastMonth(ajson.Records[0][0].stringValue);
    setTaxLastMonth(ajson.Records[0][1].stringValue);
    setNettLastMonth(ajson.Records[0][2].stringValue);

    // setEarningLastMonth2(ajson.Records[1][1].stringValue);
    // setEarningLastMonth3(ajson.Records[2][1].stringValue);
  };
  useEffect(() => {
    setMoneyThisMonth(earningThisMonth);
  }, [earningThisMonth]);

  useEffect(() => {
    setMoneyLastMonth(earningLastMonth);
  }, [earningLastMonth]);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="teal"
            icon="revenue-new"
            title={
              <div className="title-card-dashboard">
                {earningThisMonth === undefined
                  ? formatter.format(0)
                  : formatter.format(earningThisMonth)}
              </div>
            }
            colorTitle="geekblue"
            moneyThisMonth={moneyThisMonth}
            setMoneyThisMonth={setMoneyThisMonth}
            moneyLastMonth={moneyLastMonth}
            setMoneyLastMonth={setMoneyLastMonth}
            taxThisMonth={taxThisMonth}
            nettThisMonth={nettThisMonth}
            subTitle={
              <div className="subtitle-card-dashboard">
                <p>
                  <span>Total Pendapatan</span>
                  <br />
                  <span>(Bulan Ini)</span>
                </p>
                <p>
                  <span> {formatter.format(taxThisMonth)}</span>
                  <br/>

                  <span>(Tax)</span>
                </p>
                <p>
                  <span> {formatter.format(nettThisMonth)}</span>
                  <br/>
                  <span>(Nett)</span>
                </p>
              </div>
            }
            colorSubTitle="geekblue"
          />
        </div>
        <div className="flip-card-back">
          <EcommerceStatus
            icon="revenue-new"
            color="grey"
            title={
              <div className="subtitle-card-dashboard-grey">
                {earningLastMonth === undefined
                  ? formatter.format(0)
                  : formatter.format(earningLastMonth)}
              </div>
            }
            colorTitle="dark"
            subTitle={
              <div className="subtitle-card-dashboard">
               <p>
                  <span>Total Pendapatan</span>
                  <br />
                  <span>(Bulan Lalu)</span>
                </p>
                <p>
                  <span> {formatter.format(taxLastMonth)}</span>
                  <br/>

                  <span>(Tax)</span>
                </p>
                <p>
                  <span> {formatter.format(nettLastMonth)}</span>
                  <br/>
                  <span>(Nett)</span>
                </p>
              </div>
            }
            colorSubTitle="dark"
          />
        </div>
      </div>
    </Col>
  );
};

export default PendapatanBulanan;
