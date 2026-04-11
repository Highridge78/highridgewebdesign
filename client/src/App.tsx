import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import DemoPage from "./pages/demo";

export default function App() {
  return (
    <Switch>
      <Route path="/demo" component={DemoPage} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}
