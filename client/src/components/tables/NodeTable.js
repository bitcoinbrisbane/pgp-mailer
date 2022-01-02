import React from "react";
import Table from "./Table";

// dataField (key) props (value)
const columnConfig = {
  node: {
    children: "Node"
  },
  height: {
    children: "Height"
  }
};

const NodesTable = ({ nodes, ...props }) => (
  <Table
    data={nodes}
    columnConfig={columnConfig}
    keyField="node"
    pagination={false}
    {...props}
  />
);

export default NodesTable;
