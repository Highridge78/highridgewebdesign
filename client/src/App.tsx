import { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const DemosIndex = lazy(() => import("./pages/demos/index"));
const DemoConversionPage = lazy(() => import("./pages/demos/demo-conversion"));
const DemoPremiumPage = lazy(() => import("./pages/demos/demo-premium"));
const DemoCreativePage = lazy(() => import("./pages/demos/demo-creative"));
const NotFound = lazy(() => import("./pages/NotFound"));

function FocusManagement() {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root && !root.hasAttribute("tabindex")) {
      root.setAttribute("tabindex", "-1");
    }
  }, []);

  return null;
}

export default function App() {
  return (
    <div>
      <FocusManagement />
      <Suspense fallback={null}>
        <Switch>
          <Route path="/demos/demo-1" component={DemoConversionPage} />
          <Route path="/demos/demo-conversion" component={DemoConversionPage} />
          <Route path="/demos/demo-2" component={DemoPremiumPage} />
          <Route path="/demos/demo-premium" component={DemoPremiumPage} />
          <Route path="/demos/demo-3" component={DemoCreativePage} />
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
