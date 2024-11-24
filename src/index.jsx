import * as React from "react";
import { render } from "react-dom";
import ReactGlobe from "react-globe";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "./index.css";
import markers from "./markers";
import markerRenderer from "./markerRenderer";

const options = {
  markerRenderer,
};

function App() {
  return (
    <div className="">
      <ReactGlobe
        height="100vh"
        globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
        markers={markers}
        width="100vw"
        options={options}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);