import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DemoPage = lazy(() => import("./pages/demo"));

// Hint route chunks likely needed on user interactions.
const preloadRoutes = () => {
  import("./pages/Home");
  import("./pages/NotFound");
  import("./pages/demo");
};

export default function App() {
  return (
    <div onPointerEnter={preloadRoutes} onFocus={preloadRoutes}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/demo" component={DemoPage} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}
