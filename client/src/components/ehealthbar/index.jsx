import React, { Component } from "react";
import "./style.css"
function EHBar(props) {
  return (
    <div>
      <progress class="nes-progress emhealth is-error" value="100" max="100"></progress>
    </div>
  );
}

export default EHBar;
