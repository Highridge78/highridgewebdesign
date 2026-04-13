import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DemoPage = lazy(() => import("./pages/demo"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/demo" component={DemoPage} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
