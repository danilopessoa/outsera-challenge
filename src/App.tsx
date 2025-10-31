import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Template } from "./template/Template";
import { Skeleton } from "./components/Skeleton/Skeleton.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Movies = React.lazy(() => import("./pages/Movies/Movies"));

const routes = [
  { label: "Dashboard", to: "/", component: <Dashboard /> },
  { label: "List", to: "/movies", component: <Movies /> },
];

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Template />}>
            {routes.map((item) => (
              <Route
                key={item.to}
                path={item.to}
                element={<React.Suspense fallback={<Skeleton />}>{item.component}</React.Suspense>}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>{" "}
    </QueryClientProvider>
  );
};

export default App;
