import React from "react";
import Router from "./Router";
import { SWRConfig } from "swr";
import pgp from "../apis/pgp";
// import { AuthProvider } from "./Auth";
// import "./App.scss";

const swrConfig = {
  fetcher: url => pgp.secure.get(url).then(res => res.data),
  shouldRetryOnError: false
};

const App = () => (
  <SWRConfig value={swrConfig}>
    {/* <AuthProvider> */}
      <Router />
    {/* </AuthProvider>/ */}
  </SWRConfig>
);

export default App;