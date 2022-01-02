import React from "react";
import Table from "./Table";
import moment from "moment";
import prefixID from "../../utils/prefixID";
import truncate from "../../utils/truncate";

const blockChain =
  process.env.REACT_APP_BTC_NETWORK === "testnet" ? "btc-testnet" : "btc";

// dataField (key) props (value)
const columnConfig = {
  id: {
    children: "ID",
    dataFormat: id => prefixID(id, "T"),
    width: "8%"
  },
  sourceID: {
    children: "SourceID",
    dataFormat: (cell, row) => {
      if (row.type === "Referral Credit") {
        return prefixID(row.sourceID, "R");
      } else {
        return prefixID(row.sourceID, "D");
      }
    },
    width: "8%"
  },
  coin: {
    children: "Coin",
    width: "8%"
  },
  amount: {
    children: "Amount",
    width: "10%",
    dataFormat: amt => truncate(amt, 8)
  },
  address: {
    children: "Address",
    dataFormat: address => (
      <a
        href={`https://live.blockcypher.com/${blockChain}/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {address}
      </a>
    )
  },
  created: {
    children: "Created",
    width: "10%",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY")
  },
  rate: {
    children: "Rate",
    width: "10%"
  },
  email: {
    children: "Email"
  },
  tx: {
    children: "TX",
    dataFormat: tx => (
      <a
        href={`https://live.blockcypher.com/${blockChain}/tx/${tx}`}
        target="_blank"
        rel="noopener noreferrer"
        children={tx}
      />
    )
  }
};

const defaultOptions = {
  defaultSortName: "created",
  defaultSortOrder: "desc",
  sizePerPageList: [20, 30, 50, 75, 100],
  sizePerPage: 50
};

const TransfersTable = ({
  transfers,
  highlightUnverified,
  options = {},
  ...props
}) => {
  const formatRow = row => {
    if (!highlightUnverified) return "";
    return row.smsStatus === 4 ? "" : "table-danger";
  };

  const propsWithUnSelectable = {
    ...props,
    selectRow: {
      ...props.selectRow,
      unselectable: transfers
        ?.filter(
          t =>
            t.userID === process.env.REACT_APP_UNMATCHED_DEFAULT_ACCOUNT ||
            t.type === "custodial"
        )
        .map(t => t.id)
    }
  };
  return (
    <Table
      data={transfers}
      columnConfig={columnConfig}
      keyField="id"
      options={{ ...defaultOptions, ...options }}
      trClassName={formatRow}
      {...propsWithUnSelectable}
    />
  );
};

export default TransfersTable;
