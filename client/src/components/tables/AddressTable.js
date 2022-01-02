import React from "react";
import Table from "./Table";
import { Link } from "react-router-dom";

const formatCustodial = {
  true: "True",
  false: "False"
};
// dataField (key) props (value)
const columnConfig = {
  id: {
    children: "ID",
    width: "8%"
  },
  address1: {
    children: "Address"
  },
  isCustodial: {
    children: "Custodial",
    width: "8%",
    dataFormat: isCustodial => formatCustodial[isCustodial]
  },
  label: {
    children: "Label",
    width: "15%"
  },
  percent: {
    children: "Percent",
    width: "8%"
  },
  userID: {
    children: "User ID",
    dataFormat: uid => <Link to={{ pathname: `/user/${uid}` }}>{uid}</Link>
  }
};

const options = {
  sizePerPage: 25
};

const AddressTable = ({ addresses, ...props }) => (
  <Table
    data={addresses}
    columnConfig={columnConfig}
    keyField="id"
    options={options}
    {...props}
  />
);

export default AddressTable;
