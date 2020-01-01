import React, { Component } from "react";
import "./style.css"
function HealthBar(props) {
  return (
    <div>
      <progress class="nes-progress health is-error" value="100" max="100"></progress>
    </div>
  );
}

export default HealthBar;
