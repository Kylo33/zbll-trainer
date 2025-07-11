import Cube from "cubejs";
import { Alg } from "cubing/alg";
import fs, { cp } from "node:fs";

const data = fs.readFileSync("algs.txt", "utf8").split("\n");

const algs = {};

data.forEach(algorithm => {
  const alg_list = algorithm.replaceAll(/[\(\)\[\]]/g, "").split(" ");
  alg_list[0] = alg_list[0].replace("y", "U");
  alg_list[alg_list.length - 1] = alg_list[alg_list.length - 1].replace("y", "U");
  const alg = new Alg(alg_list.join(" "));

  const setupCube = new Cube();
  setupCube.move(alg.invert().toString().replaceAll(/([RLUDFBMESrludfbmxyz])2'/g, "$12"));

  const regularCube = new Cube();
  regularCube.move(alg.toString().replaceAll(/([RLUDFBMESrludfbmxyz])2'/g, "$12"))

  let coRotations = [];
  for (let i = 0; i < 4; i++) {
    coRotations.push(setupCube.co.slice(i, 4).concat(setupCube.co.slice(0, i)));
  }

  coRotations.sort();
  const coKey = coRotations[0].join("");

  const cpArray = [];
  const startCp = regularCube.cp.findIndex((num) => num == 0);
  for (let i = 1; i <= 3; i++) {
    cpArray.push(regularCube.cp[(startCp + i) % 4]);
  }
  const cpKey = cpArray.join("");

  const epArray = [];
  for (let i = 0; i <= 4; i++) {
    epArray.push(regularCube.ep[(startCp + i) % 4]);
  }
  const epKey = epArray.join("");

  if (!Object.keys(algs).includes(coKey)) {
    algs[coKey] = {}
  }

  if (!Object.keys(algs[coKey]).includes(cpKey)) {
    algs[coKey][cpKey] = {}
  }

  if (!Object.keys(algs[coKey][cpKey]).includes(epKey)) {
    algs[coKey][cpKey][epKey] = []
  }

  algs[coKey][cpKey][epKey].push(alg.toString());
});

fs.writeFileSync("algs.json", JSON.stringify(algs, null, 2))