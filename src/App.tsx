import React from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App = () => {
  return (
    // <Persist>
    <QueryClientProvider client={queryClient}>

    <AppRoutes />
    </QueryClientProvider>
    // </Persist>
  );
};
export default App;
