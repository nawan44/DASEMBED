import React from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import "antd/lib/button/style/css";

// import { StatusTag } from "../StatusTag";

const EventsTable = ({ data }) => {
  console.log("data", data)
  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoice_id",
      key: "invoice_id",

      // key: "1",
      // render: (text) => {
      //   return <span className="gx-text-red">{text}</span>
      // },
    },
    {
      // key: "2",
      title: "Device Id / Agent ID",
      dataIndex: "merchant_id",
      key: "merchant_id",

    },
    {
      title: "Nama Usaha",
      dataIndex: "nama_usaha",
      key: "nama_usaha",

    },
    {
      title: "Transaction Value",
      dataIndex: "total_value",
      key: "total_value",

    },
    {
      title: "Tanggal Transaksi",
      dataIndex: "created_at",
      key: "created_at",

    },
  ];

  return (
    <Table
      className="gx-table-no-bordered"
      rowKey={data?.invoice_id}
      dataSource={data}
      columns={columns}
    />
  );
};

export default EventsTable;
