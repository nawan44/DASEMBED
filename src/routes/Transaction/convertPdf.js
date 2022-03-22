import React from "react";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button, } from "antd";
const dataDummy = [
  {
    key: "1",
    tgl_transaksi: "1 Maret 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "2",
    tgl_transaksi: "1 Februari 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "3",
    tgl_transaksi: "15 Maret 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "4",
    tgl_transaksi: "20 Februari 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "5",
    tgl_transaksi: "30 Januari 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
];

const ConvertPdf = ( props) => {
  const {dataFilter} =props

  const exportPDF = () => {
    // doc.setFontSize(15);
    // const marginLeft = 40;
    // const title = "Data Transaksi"; //Nanti tampil diatas
    const columns = [
      
        // "Tanggal Transaksi",
        // "Merchant ID",
        // "Nama Usaha",
        // "Type Pajak",
        // "Nominal Transasksi",
        // "Nominal Pajak",
        // "Nominal Nett"
        { title: "Tanggal Transaksi", dataKey: "tgl_transaksi" },
        { title: "Merchant ID", dataKey: "merchant_id" },
        { title: "Nama Usaha", dataKey: "nama_usaha" },

        { title: "Type Pajak", dataKey: "type_pajak" },
        { title: "Nominal Transasksi", dataKey: "nominal_transaksi" },
        { title: "Nominal Pajak", dataKey: "nominal_pajak" },

        { title: "Nominal Nett", dataKey: "nominal_nett" },
    ];

    const rows = dataFilter?.map((elt) => ({
      tgl_transaksi : elt?.tgl_transaksi,
      merchant_id:    elt?.merchant_id,
      nama_usaha:    elt?.nama_usaha,
      type_pajak:     elt?.type_pajak,
      nominal_transaksi:      elt?.nominal_transaksi,
      nominal_pajak:     elt?.nominal_pajak,
      nominal_nett:     elt?.nominal_nett
          }))

    // let content = {
    //   startY: 50,
    //   head: headers,
    //   body: data,
    // };

    // doc.text(title, marginLeft, 40);
    // doc.autoTable(content);
    // doc.save("report.pdf");
    var doc = new jsPDF("l",  "pt");

      // doc.text(title, marginLeft, 40);
    // doc.autoTable({
    //   head: headers,
    //   body: data,
    // })
    doc.autoTable( {
      columns:columns,
      body:rows,
      startY: 60,

      margin: { horizontal: 10 },
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      columnStyles: {  cellWidth: "wrap"  },
      theme: "striped",
      showHead: "everyPage",
      didDrawPage: function (elt) {
        // Header
        doc.setFontSize(16);
        doc.setTextColor("#161C22");
        // doc.setFontWeight("bold")
        doc.text("Data Transaksi", elt.settings.margin.top, 25);
        // doc.text("PT. Emtres Indonesia", 265, 34);

        // Footer
        let str = "" + doc.internal.getNumberOfPages();
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        let pageSize = doc.internal.pageSize;
        let pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text("PT. Emtres Indonesia", elt.settings.margin.left, pageHeight - 10);
        doc.text(575, 830, str);
      }
    });
    doc.save('transasksi.pdf')
  };

  return (
    <div>
      {" "}
      <Button
        variant="contained"
        className="laporan"
        // startIcon={<Description />}
        onClick={exportPDF}
      >
        PDF Transaksi
      </Button>
    </div>
  );


  
};
export default ConvertPdf;