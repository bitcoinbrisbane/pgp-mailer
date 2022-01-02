import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import useSWR, { mutate } from "swr";
import { format as format$ } from "currency-formatter";
import DepositsTable from "../components/tables/DepositsTable";
import useSelectedRow from "../hooks/useSelectedRow";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { history } from "../components/Router";
import SubmitSpinnerButton from "../components/forms/SubmitSpinnerButton";
import api from "../apis/pgp";
import { ToggleButton } from "../components/ToggleButton";
import SearchFilter from "../components/SearchFilter";

const defaultArray = [];

const DepositsPage = () => {
  //const [deposits, setDeposits] = useState([]);
  const { data, error } = useSWR("/mail");
//   const [isDeleteOpen, setDeleteOpen] = useState(false);
//   const [isDeleting, setDeleting] = useState(false);
//   const [deleteError, setDeleteError] = useState(null);
  const isLoading = !data && !error;
  //const [selectedDepositID, , selectDepositConfig] = useSelectedRow(null);
//   const selectedDeposit = data && data.find(d => d.id === selectedDepositID);

//   const deleteSelected = async () => {
//     try {
//       setDeleting(true);
//       await gpib.secure.delete(`/deposit/${selectedDepositID}`);
//       mutate("/deposit", state =>
//         state.filter(d => d.id !== selectedDepositID)
//       );
//       setDeleteOpen(false);
//       setDeleting(false);
//     } catch (e) {
//       setDeleteError(e);
//       setDeleting(false);
//     }
//   };

//   const toggleDeleteModal = () => {
//     setDeleteError(null);
//     setDeleteOpen(isOpen => !isOpen);
//   };

//   const handleUnmatched = checked => {
//     if (checked) {
//       const unmatchedDeposits = data.filter(
//         deposit =>
//           deposit.userID ===
//           `${process.env.REACT_APP_UNMATCHED_DEFAULT_ACCOUNT}`
//       );
//       setDeposits(unmatchedDeposits);
//     } else {
//       setDeposits(data);
//     }
//   };

  useEffect(() => {
    if (data) setDeposits(data);
  }, [data]);
  return (
    <Layout activeTab="Deposits">
      <div className="container-fluid py-5">
        <Loader loading={isLoading} />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex flex-row">
            <div>
              <h1>Emails</h1>
            </div>
            <div className="ml-5 d-flex justify-content-between align-items-start mt-3">
              <ToggleButton defaultChecked={false} onChange={handleUnmatched} />
              <label className="ml-3 mt-1">Show Only Unmatched Deposits</label>
            </div>
          </div>
          <div>
            {/* <Button
              type="button"
              className="mr-2"
              onClick={() => history.push("/deposits/add")}
              children="Add Deposit"
            />
            <Button
              type="button"
              className="mr-2"
              onClick={() =>
                history.push(`/deposits/edit/${selectedDepositID}`)
              }
              disabled={!selectedDepositID}
              children="Edit Deposit"
            />
            <Button
              type="button"
              className="mr-2"
              onClick={toggleDeleteModal}
              disabled={!selectedDepositID}
              children="Delete Deposit"
            />
            <Button
              type="button"
              onClick={() => {
                history.push(`/deposits/rebuild/${selectedDepositID}`);
              }}
              disabled={!selectedDepositID}
              children="Rebuild Deposit"
            /> */}
          </div>
        </div>
        {/* <SearchFilter
          data={data || defaultArray}
          setFiltered={setDeposits}
          className="form-control my-4"
          placeholder="Search..."
        /> */}
        <ErrorMessage error={error} />
        {/* <DepositsTable
          deposits={deposits}
          selectRow={selectDepositConfig}
          hidden={["bankID"]}
        /> */}
      </div>
      {/* <Modal
        isOpen={isDeleteOpen}
        heading={`Delete Deposit: ${selectedDepositID}`}
        onDismiss={toggleDeleteModal}
      >
        <p>Are you sure you want to delete this deposit?</p>
        <ul>
          <li>{`ID: ${selectedDepositID}`}</li>
          <li>{`Reference: ${selectedDeposit?.reference}`}</li>
          <li>{`Amount: ${format$(selectedDeposit?.amount, {
            code: "AUD"
          })}`}</li>
        </ul>
        <ErrorMessage error={deleteError} />
        <SubmitSpinnerButton
          isSubmitting={isDeleting}
          onClick={deleteSelected}
          submitText="Delete"
        />
      </Modal> */}
    </Layout>
  );
};

export default DepositsPage;