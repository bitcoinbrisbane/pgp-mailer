import React, { useContext, memo } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../Auth";
import { history } from "../Router";
import logo from "./gpib-logo.png";
import "./Nav.scss";

const _Nav = ({ links, noBrand = false, activeTab }) => {
  const { logout } = useContext(AuthContext);
  // Set default links
  if (!links)
    links = [
      { label: "Users", onClick: () => history.push("/users") },
      {
        label: "Deposits",
        children: [
          {
            type: "Item",
            label: "Deposits",
            onClick: () => history.push("/deposits")
          },
          {
            type: "Item",
            label: "Upload From CSV",
            onClick: () => history.push("/deposits/upload")
          },
          {
            type: "Item",
            label: "Unmatched Deposits",
            onClick: () => history.push("/deposits/unmatched")
          }
        ]
      },
      {
        label: "Transfers",
        children: [
          {
            type: "Item",
            label: "Transfers",
            onClick: () => history.push("/transfers")
          },
          {
            type: "Item",
            label: "Pending transfers",
            onClick: () => history.push("/pendingtransfers")
          }
        ]
      },
      { label: "Addresses", onClick: () => history.push("/addresses") },
      { label: "Transactions", onClick: () => history.push("/transactions") },
      { label: "Address History", onClick: () => history.push("/history") },
      {
        label: "Referral",
        onClick: () => history.push("/referral")
      },
      { label: "Enterprises", onClick: () => history.push("/enterprises") },
      { label: "Log Out", onClick: logout }
    ];

  // For a dropdown menu item, add an object like this to the links array
  // {
  //   label: "Dropdown",
  //   children: [
  //     { type: "Item", label: "Action 1", onClick: () => console.log("action") },
  //     { type: "Item", label: "Action 2", onClick: () => console.log("action") },
  //     { type: "Divider" },
  //     { type: "Item", label: "Action 3", onClick: () => console.log("action") }
  //   ]
  // }

  const renderBrand = () => (
    <Navbar.Brand
      style={{ cursor: "pointer" }}
      onClick={() => history.push("/")}
    >
      <img src={logo} alt="Get Paid In Bitcoin" />
    </Navbar.Brand>
  );

  const renderLinks = () => (
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav>
        {links.map(({ label, onClick, children }, i) => {
          const classes = label === activeTab ? "active" : "";
          return !children ? (
            <Nav.Link
              onClick={onClick}
              key={i}
              className={classes}
              children={label}
            />
          ) : (
            <NavDropdown title={label} key={i} className={classes}>
              {children.map((c, ind) => {
                const Item = NavDropdown[c.type];
                return (
                  <Item onClick={c.onClick} key={ind} children={c.label} />
                );
              })}
            </NavDropdown>
          );
        })}
      </Nav>
    </Navbar.Collapse>
  );
  return (
    <Navbar bg="light" expand="lg">
      {!noBrand && renderBrand()}
      {!links.length || <Navbar.Toggle aria-controls="basic-navbar-nav" />}
      {!links.length || renderLinks()}
    </Navbar>
  );
};

export default memo(_Nav);
