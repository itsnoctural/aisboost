import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Layout } from "./components/layout";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense>
          <Layout>{props.children}</Layout>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
