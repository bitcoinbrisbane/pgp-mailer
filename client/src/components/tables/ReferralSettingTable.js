import React from "react";
import Table from "./Table";
import moment from "moment";
import truncate from "../../utils/truncate";
import { Link } from "react-router-dom";

const columnConfig = {
  id: {
    children: "ID",
    width: "5%"
  },
  userID: {
    children: "User ID",
    dataFormat: uid => <Link to={{ pathname: `/user/${uid}` }}>{uid}</Link>,
    width: "20%"
  },
  referralCode: {
    children: "Referral Code",
    width: "10%"
  },
  fixedAmount: {
    children: "Fixed Amount",
    width: "10%",
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
    width: "10%",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY")
  },
  enabled: {
    children: "Enabled",
    width: "5%"
  },
  numberOfRegisters: {
    children: "Number of Registers",
    width: "10%"
  },
  numberOfDeposits: {
    children: "Number of Deposits",
    width: "10%"
  }
};

const options = {
  sizePerPage: 25
};

const ReferralSettingTable = ({ referralSetting, ...props }) => (
  <Table
    data={referralSetting}
    columnConfig={columnConfig}
    keyField="id"
    options={options}
    {...props}
  />
);

export default ReferralSettingTable;
