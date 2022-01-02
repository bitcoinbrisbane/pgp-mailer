import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ error, isHidden }) =>
  error && !isHidden ? <Alert variant="danger">{error}</Alert> : null;

export default ErrorMessage;
