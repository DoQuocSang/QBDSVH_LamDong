import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default function Model() {
  const loadModel = (scene, path, name) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      path,
      (model) => {
        console.log(`${name} - Loaded successfully!`);
        //model.scene.scale.set(2, 2, 2);
        
        const box = new THREE.Box3().setFromObject(model.scene);

        const size = box.getSize(new THREE.Vector3());

        const maxDimension = Math.max(size.x, size.y, size.z);

        const scaleFactor = 1.5 / maxDimension;

        model.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

        scene.add(model.scene);
      },
      (progress) => {
        console.log(`Loading ${name} : ${progress.loaded} / ${progress.total}`);
      },
      (err) => {
        console.log(`Error loading ${name} : ${err}`);
      }
    );
  };

  const ModelTypeWriter = (scene) => {
    loadModel(
      scene,
      "./models/typewriter/scene.gltf",
      "Type Writer 1966s - Máy đánh chữ"
    );
  };

  const ModelMG = (scene) => {
    loadModel(scene, "./models/binh_su/Binhsu.gltf", "Machine Gun - Súng máy");
  };

  const buddha_wood = (scene) => {
    loadModel(scene, "./models/buddha_wood/scene.gltf", "Buddha - Tượng Phật");
  };

  const batavialand = (scene) => {
    loadModel(scene, "./models/batavialand/scene.gltf", "Bình");
  };

  const seeker_gun = (scene) => {
    loadModel(scene, "./models/radio1950s/scene.gltf", "Radio1950s");
  };

  const bronze_age_vesse = (scene) => {
    loadModel(scene, "./models/bronze_age_vesse/scene.gltf", "");
  };

  const galaxy_s21 = (scene) => {
    loadModel(scene, "./models/iPhone_01.gltf", "");
  };

  return { ModelTypeWriter, ModelMG, buddha_wood, batavialand, seeker_gun, bronze_age_vesse, galaxy_s21 };
}
