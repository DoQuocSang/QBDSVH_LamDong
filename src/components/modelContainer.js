/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Model from "../hooks/loadModel";
import "../styles/model.css";

export default function ModelContainer({ nameModel }) {
  const mountRef = useRef(null);

  const [animationId, setAnimationId] = useState();

  let currentRef;

  const [showInfo, setShowInfo] = useState(false);

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };


  useEffect(() => {
    // Tạo scene và camera
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(
      28,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    let modelGroup = new THREE.Group();
    let renderer = new WebGLRenderer({
      alpha: true,
      powerPreference: "high-performance",
      precision: "lowp",
      animation: true,
    });
    // Khởi tạo không gian 3 chiều tương tác với object
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    let shouldAnimate = true;
    // Điều khiển quỹ đạo của object
    orbitControls.enableDamping = true;

    currentRef = mountRef.current;
    createScene(scene, camera, modelGroup);
    initRenderer(currentRef, renderer);
    const animate = () => {
      if (shouldAnimate) {
        const id = requestAnimationFrame(animate);
        setAnimationId(id);
        orbitControls.autoRotate = true;
        orbitControls.update();
        // error: Khi kết xuất gửi 1 element html
        renderer.render(scene, camera);
      }
    };

    animate();

    // Biến phần tử thành canvas say khi render, hiển thị canvas bên trong scene
    currentRef.appendChild(renderer.domElement);

    return () => {
      // Optimize clean memory cache
      shouldAnimate = false;

      currentRef.removeChild(renderer.domElement);
      scene.clear();
      camera.clear();
      modelGroup.clear();
      renderer.clear();
      cancelAnimationFrame(animationId);

      //
      scene = null;
      camera = null;
      renderer = null;
      modelGroup = null;
      orbitControls = null;
    };
  }, []);

  const createScene = (scene, camera, modelGroup) => {
    const ambientLight = new THREE.AmbientLight(0xeeeeee, 0.8);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    camera.position.set(3, 2, 5);
    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(camera);

    importModel(modelGroup, scene);

    // After the model is loaded
    modelGroup.traverse((object) => {
      if (object.isMesh) {
        // Update the camera to look at the center of the model
        camera.lookAt(object.position);
      }
    });
  };

  const importModel = (modelGroup, scene) => {
    if (nameModel === "typeWrite") {
      const { ModelTypeWriter } = Model();
      ModelTypeWriter(modelGroup);
    } else if (nameModel === "galaxy_s21") {
      const { galaxy_s21 } = Model();
      galaxy_s21(modelGroup);
    } else if (nameModel === "bronze_age_vesse") {
      const { bronze_age_vesse } = Model();
      bronze_age_vesse(modelGroup);
    } else if (nameModel === "seeker_gun") {
      const { seeker_gun } = Model();
      seeker_gun(modelGroup);
    } else if (nameModel === "batavialand") {
      const { batavialand } = Model();
      batavialand(modelGroup);
    } else if (nameModel === "buddha_wood") {
      const { buddha_wood } = Model();
      buddha_wood(modelGroup);
    }

    scene.add(modelGroup);
  };

  const initRenderer = (currentRef, renderer) => {
    const { clientWidth: width, clientHeight: height } = currentRef;
    renderer.setSize(width, height);
    // Set up độ phân giải cho model
    renderer.setPixelRatio(window.devicePixelRatio);
};  

  return <div className="container3d" ref={mountRef}>
      <button onClick={handleInfoClick} className="btn-info" ></button>
      {showInfo && <div className="block-text">Thông tin hiện vật: Tượng Phật</div>}
  </div>;
}
