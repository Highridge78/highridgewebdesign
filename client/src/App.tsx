import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Hint route chunks likely needed on user interactions.
const preloadRoutes = () => {
  import("./pages/Home");
  import("./pages/Portfolio");
  import("./pages/NotFound");
};

export default function App() {
  return (
    <div onPointerEnter={preloadRoutes} onFocus={preloadRoutes}>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}
