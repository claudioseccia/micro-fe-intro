/* 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

import "./index.scss";
import Header from "./Header";
import Footer from "./Footer";
import HomeContent from "./HomeContent";

const App = () => (
  <Router>
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Header />
      <div className="my-10">
        <HomeContent />
      </div>
      
      <Footer />
    </div>
  </Router>
);
ReactDOM.render(<App />, document.getElementById("app"));
 */
import React from "react";
import ReactDOM from "react-dom";
import "remixicon/fonts/remixicon.css";
import "./index.scss";
import MainLayout from "./MainLayout";

ReactDOM.render(<MainLayout />, document.getElementById("app"));