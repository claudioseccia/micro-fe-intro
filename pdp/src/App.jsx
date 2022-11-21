import React, {Suspense, useState} from "react";
import ReactDOM from "react-dom";

import "./index.scss";

const Header = React.lazy(()=>import("home/Header"));
import Footer from "home/Footer";
const App = () => {
  const [showHeader, setShowHeader] = useState(false);
  return (<div className="mt-10 text-3xl mx-auto max-w-6xl">
            {showHeader && 
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>}
            <div className="my-10">PDP Page Content</div>
            <button className="text-3xl p-5" onClick={()=>setShowHeader(!showHeader)}>Show the Header</button>
            <Footer />
          </div>);
}


ReactDOM.render(<App />, document.getElementById("app"));
