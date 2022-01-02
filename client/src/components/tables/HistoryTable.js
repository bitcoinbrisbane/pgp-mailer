import React from "react";
import moment from "moment";
import Table from "./Table";

const columnConfig = {
  id: {
    children: "ID"
  },
  addressID: {
    children: "Address ID",
    width: "8%"
  },
  message: {
    children: "Log",
    width: "60%"
  },
  ipAddress: {
    children: "IP Address"
  },
  created: {
    children: "Created",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY"),
    width: "10%"
  }
};

const options = {
  sizePerPage: 25
};

const HistoryTable = ({ history, ...props }) => (
  <Table
    data={history}
    columnConfig={columnConfig}
    keyField="id"
    options={options}
    {...props}
  />
);
export default HistoryTable;
