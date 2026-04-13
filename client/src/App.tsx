import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";

const DemoPage = lazy(() => import("./pages/demo"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Switch>
      <Route path="/demo">
        <Suspense fallback={null}>
          <DemoPage />
        </Suspense>
      </Route>
      <Route path="/" component={Home} />
      <Route>
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
}
