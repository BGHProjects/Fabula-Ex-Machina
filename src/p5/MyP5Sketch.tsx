"use client";

import React from "react";
import p5Types from "p5"; //Import this for typechecking and intellisense
import vert from "./vert";
import frag from "./frag";
// @ts-ignore
import { type Sketch } from "@p5-wrapper/react";
// @ts-ignore
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const MySketch = () => {
  // a shader variable
  let theShader: any;

  const sketch: Sketch = (p5: any) => {
    p5.preload = () => {
      theShader = p5.createShader(vert, frag);
    };

    p5.setup = () => {
      p5.pixelDensity(3);
      p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
      p5.noStroke();
    };

    p5.draw = () => {
      p5.shader(theShader);

      theShader.setUniform("u_resolution", [p5.width * 2, p5.height * 2]);
      theShader.setUniform("u_time", p5.millis() / 5000.0);
      theShader.setUniform("u_frame", p5.frameCount * 2.0);

      p5.rect(0, 0, p5.windowWidth, p5.windowHeight);
    };
  };

  return <NextReactP5Wrapper sketch={sketch} />;
};

export default MySketch;
