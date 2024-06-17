// src/App.js
import React from "react";
import { RouteList } from "./routes"; // Adjust the import if necessary
import Header from "./components/Header"; // Adjust the path if necessary

const App = () => {
  return (
    <div>
      <Header />
      <RouteList />
    </div>
  );
};

export default App;
