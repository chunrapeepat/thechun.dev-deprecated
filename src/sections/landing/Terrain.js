import React, {useEffect} from "react";
import * as THREE from "three";
import styled from "styled-components";
import {generateHeight} from "./generator";

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Terrain = () => {
  let canvas;
  let camera, scene, renderer;

  const worldWidth = 256;
  const worldDepth = 256;
  const worldHalfWidth = worldWidth / 2;
  const worldHalfDepth = worldDepth / 2;

  function init() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xefd1b5);
    scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);

    const data = generateHeight(worldWidth, worldDepth);
    camera.position.y =
      data[worldHalfWidth + worldHalfDepth * worldWidth] * 10 + 500;

    const geometry = new THREE.PlaneBufferGeometry(
      7500,
      7500,
      worldWidth - 1,
      worldDepth - 1,
    );
    geometry.rotateX(-Math.PI / 2);

    const vertices = geometry.attributes.position.array;

    for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      vertices[j + 1] = data[i] * 10;
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0xcc0000,
      side: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#000000");
    renderer.setSize(width, height);

    canvas.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }

  useEffect(() => {
    init();
  }, []);

  return <Canvas ref={mount => (canvas = mount)} />;
};

export default Terrain;
