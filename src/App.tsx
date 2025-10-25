import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Template } from "./template/Template";
import { Skeleton } from "./components/Skeleton/Skeleton.tsx";

const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Movies = React.lazy(() => import("./pages/Movies/Movies"));

const menus = [
  { label: "Dashboard", to: "/", component: <Dashboard /> },
  { label: "Filmes", to: "/filmes", component: <Movies /> },
];

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Template />}>
          {menus.map((item) => (
            <Route
              key={item.to}
              path={item.to}
              element={<React.Suspense fallback={<Skeleton />}>{item.component}</React.Suspense>}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
