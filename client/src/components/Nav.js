import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { history } from "./Router";

const _Nav = ({ links, noBrand = false }) => {
  const { logout } = useContext(AuthContext);

  // Set default links
  if (!links)
    links = [
      { label: "Account Info", onClick: () => history.push("/accountinfos") },
      { label: "Users", onClick: () => history.push("/users") },
      { 
        label: "Deposits", 
        children: [
          { type: "Item", label: "Deposits", onClick: () => history.push("/deposits") },
          { type: "Item", label: "Add deposit", onClick: () => history.push("/deposits/add") }
        ]
      },
      { 
        label: "Transfers", 
        children: [
          { type: "Item", label: "Transfers", onClick: () => history.push("/transfers") },
          { type: "Item", label: "Pending transfers", onClick: () => history.push("/pendingtransfers") }
        ]
      },
      { label: "Addresses", onClick: () => history.push("/addresses") },
      { label: "Address History", onClick: () => history.push("/history") },
      { label: "Log out", onClick: logout }
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
      Home
    </Navbar.Brand>
  );

  const renderLinks = () => (
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        {links.map(({ label, onClick, children }, i) =>
          !children ? (
            <Nav.Link onClick={onClick} key={i}>
              {label}
            </Nav.Link>
          ) : (
            <NavDropdown title={label} key={i}>
              {children.map((c, ind) => {
                const Item = NavDropdown[c.type];
                return (
                  <Item onClick={c.onClick} key={ind}>
                    {c.label}
                  </Item>
                );
              })}
            </NavDropdown>
          )
        )}
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

export default _Nav;
