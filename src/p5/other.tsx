import React, { useEffect, useState } from "react";
// @ts-ignore
import { Sketch } from "react-p5-wrapper";
import vert from "./vert";
import frag from "./frag";

function MySketch() {
  const [sketchReady, setSketchReady] = useState(false);
  let theShader: any;

  const preload = (p5: any) => {
    theShader = p5.createShader(vert, frag);
  };

  const setup = (p5: any, canvasParentRef: any) => {
    p5.pixelDensity(3);
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL).parent(
      canvasParentRef
    );
    p5.noStroke();
    setSketchReady(true);
  };

  const draw = (p5: any) => {
    if (!theShader) return;

    p5.shader(theShader);
    theShader.setUniform("u_resolution", [p5.width * 2, p5.height * 2]);
    theShader.setUniform("u_time", p5.millis() / 5000.0);
    theShader.setUniform("u_frame", p5.frameCount * 2.0);

    p5.rect(0, 0, p5.width, p5.height);
  };

  const windowResized = (p5: any) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    // Clean up p5.js instance when the component unmounts
    return () => setSketchReady(false);
  }, []);

  useEffect(() => {
    console.log("sketchReady", sketchReady);
  }, [sketchReady]);

  return sketchReady ? (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      ready={() => console.log("Sketch is ready")} // Use the ready prop to get notified when setup is complete
    />
  ) : null;
}

export default MySketch;
