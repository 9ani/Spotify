import React from "react";
import { RouteList } from "./routes"; 
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <RouteList />
    </div>
  );
};

export default App;
