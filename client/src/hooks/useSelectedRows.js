import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter(v => v !== action.payload);
    case "RESET":
      return [];
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const useSelectedRows = (initialValues = [], tableConfig = {}) => {
  const [selected, dispatch] = useReducer(reducer, initialValues);
  const keyId = tableConfig.keyId || "id";
  const defaultConfig = {
    mode: "checkbox",
    onSelect: (row, isSelected) => {
      dispatch({
        type: isSelected ? "ADD" : "REMOVE",
        payload: row[keyId]
      });
    },
    onSelectAll: (isSelected, rows) => {
      if (!isSelected) return dispatch({ type: "RESET" });
      dispatch({ type: "SET", payload: rows.map(v => v[keyId]) });
    },
    unselectable: []
  };
  const config = { ...defaultConfig, ...tableConfig, selected };
  return [selected, dispatch, config];
};

export default useSelectedRows;
