import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "./Table";
import prefixID from "../../utils/prefixID";

const columnConfig = {
  id: {
    children: "ID",
    width: "8%"
  },
  depositID: {
    children: "Deposit ID",
    dataFormat: cell => prefixID(cell, "D"),
    width: "12%"
  },
  amount: {
    children: "Amount",
    width: "18%"
  },
  coin: {
    children: "Coin",
    width: "10%"
  },
  userID: {
    children: "User ID",
    dataFormat: (cell, row) => <Link to={`/user/${row.userID}`}>{cell}</Link>
  },
  created: {
    children: "Created",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY"),
    width: "10%"
  }
};

const ReferralPaymentsTable = ({ referralpayments, ...props }) => (
  <Table
    data={referralpayments}
    columnConfig={columnConfig}
    keyField="id"
    {...props}
  />
);

export default ReferralPaymentsTable;
