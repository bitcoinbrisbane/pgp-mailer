import React from "react";
import Table from "./Table";
import { format as format$ } from "currency-formatter";
import { isCurrency } from "validator";
import gpib from "../../apis/gpib";

const columnConfig = {
  userID: {
    children: "User ID",
    tdStyle: { cursor: "pointer" },
    width: "22%"
  },
  bankID: {
    children: "Bank ID",
    tdStyle: { cursor: "pointer" },
    width: "8%"
  },
  payrollReference: {
    children: "Deposit Reference",
    editable: true,
    width: "8%"
  },
  depositReference: {
    children: "Admin Deposit Reference",
    editable: false,
    width: "8%"
  },
  amount: {
    children: "Amount",
    dataFormat: cell => format$(cell, { code: "AUD" }),
    editable: false,
    width: "10%"
  },
  reference: {
    children: "Bank Description",
    editable: true,
    tdStyle: { cursor: "pointer", whiteSpace: "normal" }
  },
  fee: {
    children: "Fee",
    width: "8%",
    tdStyle: { cursor: "pointer" },
    dataFormat: cell =>
      isCurrency(String(cell)) ? (
        format$(String(cell), { code: "AUD" })
      ) : (
        <span className="text-danger">Invalid Input</span>
      )
  },
  confidence: {
    children: "Confidence",
    editable: false,
    width: "5%"
  }
};

const options = {
  sizePerPage: 25
};

const UnmatchesTable = ({ unmatches, ...props }) => {
  const propsWithUnSelectable = {
    ...props,
    selectRow: {
      ...props.selectRow,
      unselectable: unmatches
        ?.filter(
          t => t.userID === process.env.REACT_APP_UNMATCHED_DEFAULT_ACCOUNT
        )
        .map(t => t.id)
    }
  };

  const formatRow = row => {
    return row.confidence === 0 ? "table-danger" : "";
  };

  const handleAfterSaveCell = async (cellValue, selectRow) => {
    if (cellValue.userID !== process.env.REACT_APP_UNMATCHED_DEFAULT_ACCOUNT) {
      const depositHint = await gpib.secure.get(
        `/user/${cellValue.userID}/deposithints`
      );
      if (depositHint.data) {
        cellValue.payrollReference = depositHint.data.bankStatement;
      }
      propsWithUnSelectable.selectRow.unselectable.splice(
        selectRow.rowIndex,
        1
      );
    }
  };
  return (
    <Table
      data={unmatches}
      columnConfig={columnConfig}
      keyField="id"
      options={options}
      cellEdit={{
        mode: "click",
        blurToSave: true,
        afterSaveCell: handleAfterSaveCell
      }}
      trClassName={formatRow}
      {...propsWithUnSelectable}
    />
  );
};

export default UnmatchesTable;
