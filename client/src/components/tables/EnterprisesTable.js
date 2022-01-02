import React from "react";
import Table from "./Table";

const statuses = {
  0: "Pending",
  1: "Approved",
  2: "Rejected"
};
// dataField (key) props (value)
const columnConfig = {
  id: {
    children: "ID"
  },
  name: {
    children: "Name"
  },
  nameAbbreviation: {
    children: "Name Abbreviation"
  },
  abn: {
    children: "ABN"
  },
  emailDomain: {
    children: "Email Domain"
  },
  contactEmail: {
    children: "Email"
  },
  contactPhoneNumber: {
    children: "Phone"
  },
  payrollContact: {
    children: "Contact name"
  },
  payrollInformation: {
    children: "Payroll Information"
  },
  numberOfEmployees: {
    children: "Number of Employees"
  },
  status: {
    children: "Status",
    dataFormat: status => statuses[status]
  },
  notes: {
    children: "Notes"
  },
  logoURL: {
    children: "Logo",
    dataFormat: (cell, row) => {
      return (
        cell && (
          <img
            src={`${process.env.REACT_APP_API_URL}/Logos/${cell}`}
            alt="logo"
            width="50"
            height="50"
          />
        )
      );
    }
  }
};

const options = {
  defaultSortName: "id",
  defaultSortOrder: "desc",
  sizePerPage: 25
};

const EnterprisesTable = ({ enterprises, highlightStatus, ...props }) => {
  const formatRow = row => {
    if (!highlightStatus) return "";
    if (row.status === 0) return "table-info";
    if (row.status === 2) return "table-danger";
    return "";
  };
  return (
    <Table
      data={enterprises}
      columnConfig={columnConfig}
      keyField="id"
      options={options}
      trClassName={formatRow}
      {...props}
    />
  );
};

export default EnterprisesTable;
