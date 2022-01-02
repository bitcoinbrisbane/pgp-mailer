import React from "react";
import Table from "./Table";
import moment from "moment";
import truncate from "../../utils/truncate";

const columnConfig = {
  id: {
    children: "ID",
    width: "8%"
  },
  referralCode: {
    children: "Referral Code",
    width: "16%"
  },
  fixedAmount: {
    children: "Fixed Amount",
    width: "12%",
    dataFormat: amt => truncate(amt, 8)
  },
  percentageAmount: {
    children: "Percentage Amount",
    width: "12%",
    dataFormat: amt => truncate(amt, 8) + "%"
  },
  maximumAmount: {
    children: "Maximum Amount",
    width: "12%",
    dataFormat: amt => truncate(amt, 8)
  },
  created: {
    children: "Created",
    width: "12%",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY")
  },
  expires: {
    children: "Expires",
    width: "12%",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY")
  },
  enabled: {
    children: "Enabled",
    width: "12%"
  }
};

const options = {
  sizePerPage: 25
};
const ReferralStrategyTable = ({ referralStrategy, ...props }) => (
  <Table
    data={referralStrategy}
    columnConfig={columnConfig}
    keyField="id"
    options={options}
    {...props}
  />
);

export default ReferralStrategyTable;
