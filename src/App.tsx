import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => {
  return (
    // <Persist>
    <AppRoutes />
    // </Persist>
  );
};
export default App;
