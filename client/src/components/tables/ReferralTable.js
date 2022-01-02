import React from "react";
import Table from "./Table";
import moment from "moment";
import truncate from "../../utils/truncate";

const columnConfig = {
  id: {
    children: "ID",
    width: "15%"
  },
  fixedAmount: {
    children: "Amount",
    width: "15%",
    dataFormat: amt => truncate(amt, 8)
  },
  percentageAmount: {
    children: "Percentage Amount",
    width: "15%",
    dataFormat: amt => truncate(amt, 8)
  },
  userID: {
    children: "FriendUserID",
    dataFormat: userID => (
      <a href={`/user/${userID}`} target="_blank" rel="noopener noreferrer">
        {userID}
      </a>
    ),
    width: "30%"
  },
  created: {
    children: "Created",
    width: "15%",
    dataFormat: cell => cell && moment(cell).format("DD-MM-YYYY")
  },
  enabled: {
    children: "Enabled",
    width: "10%"
  }
};
const defaultOptions = {
  defaultSortName: "created",
  defaultSortOrder: "desc",
  sizePerPageList: [20, 30, 50, 75, 100],
  sizePerPage: 50
};
const ReferralTable = ({ selectRow, referrals, options = {}, ...props }) => {
  return (
    <Table
      selectRow={selectRow}
      data={referrals}
      columnConfig={columnConfig}
      keyField="id"
      options={{ ...defaultOptions, ...options }}
      {...props}
    />
  );
};
export default ReferralTable;
