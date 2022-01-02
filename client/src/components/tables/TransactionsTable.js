import React from "react";
import Table from "./Table";
import moment from "moment";
import parseSATS from "../../utils/parseSats";

// dataField (key) props (value)
const columnConfig = {
  timestamp: {
    children: "Time Stamp",
    width: "10%",
    dataFormat: cell => cell && moment.unix(cell).format("hh:mm DD-MM-YYYY")
  },
  balanceChange: {
    children: "Amount",
    width: "8%",
    dataFormat: cell => parseSATS(cell)
  },
  blockHash: {
    children: "Block Hash",
    dataFormat: hash => (
      <a
        href={`https://live.blockcypher.com/btc/block/${hash}`}
        target="_blank"
        rel="noopener noreferrer"
        children={hash}
      />
    )
  },
  confirmations: {
    children: "Confirmations",
    width: "10%"
  },
  height: {
    children: "Height",
    width: "8%"
  },
  transactionId: {
    children: "TX",
    dataFormat: tx => (
      <a
        href={`https://live.blockcypher.com/btc/tx/${tx}`}
        target="_blank"
        rel="noopener noreferrer"
        children={tx}
      />
    )
  }
};

const options = {
  sizePerPage: 25
};

const TransactionsTable = ({ transactions, ...props }) => {
  return (
    <Table
      data={transactions}
      columnConfig={columnConfig}
      keyField="blockHash"
      options={options}
      {...props}
    />
  );
};

export default TransactionsTable;
