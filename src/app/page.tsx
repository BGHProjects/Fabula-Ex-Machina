"use client";

import { Center } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import frag from "@/p5/frag";
import vert from "@/p5/vert";
//@ts-ignore
import { NextReactP5Wrapper } from "@p5-wrapper/next";
//@ts-ignore
import { Sketch } from "@p5-wrapper/react";
import MySketch from "@/p5/MyP5Sketch";
// import MySketch from "@/p5/other";

// Will only import `react-p5` on client-side
// const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
//   ssr: false,
// });

const Home = () => {
  // See annotations in JS for more information
  // const setup = (p5: p5Types, canvasParentRef: Element) => {
  //   p5.createCanvas(500, 500).parent(canvasParentRef);
  // };

  // const sketch = (p5: any) => {

  //   p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  //   p5.draw = () => {
  //     p5.background(250);
  //     p5.normalMaterial();
  //     p5.push();
  //     p5.rotateZ(p5.frameCount * 0.01);
  //     p5.rotateX(p5.frameCount * 0.01);
  //     p5.rotateY(p5.frameCount * 0.01);
  //     p5.plane(100);
  //     p5.pop();
  //   };
  // };

  return (
    <Center w="100vw" h="100vh" bg="black">
      {/* <NextReactP5Wrapper sketch={sketch} /> */}
      <MySketch />
    </Center>
  );
};

export default Home;
