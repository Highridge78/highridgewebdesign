import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const DemosIndex = lazy(() => import("./pages/demos/index"));
const DemoConversionPage = lazy(() => import("./pages/demos/demo-conversion"));
const DemoPremiumPage = lazy(() => import("./pages/demos/demo-premium"));
const DemoCreativePage = lazy(() => import("./pages/demos/demo-creative"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/demos/demo-conversion" component={DemoConversionPage} />
          <Route path="/demos/demo-premium" component={DemoPremiumPage} />
          <Route path="/demos/demo-creative" component={DemoCreativePage} />
          <Route path="/demos/index" component={DemosIndex} />
          <Route path="/demos" component={DemosIndex} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}
