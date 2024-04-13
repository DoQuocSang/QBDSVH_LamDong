import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default function Model() {
  const loadModel = (scene, path, name) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      path,
      (model) => {
        console.log(`${name} - Loaded successfully!`);

        // Sửa xong lỗi hiển thị model 3D đồng nhất kích thước
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

  const binh_su = (scene) => {
    loadModel(
      scene,
      "./models/binh_su/Binhsu.gltf",
      "Bình sứ 3D by KietDesign"
    );
  };

  const buddha_wood = (scene) => {
    loadModel(scene, "./models/buddha_wood/scene.gltf", "Buddha - Tượng Phật");
  };

  const batavialand = (scene) => {
    loadModel(scene, "./models/batavialand/scene.gltf", "Bình");
  };

  const radio1950s = (scene) => {
    loadModel(scene, "./models/radio1950s/scene.gltf", "Radio1950s");
  };

  const roman_pottery = (scene) => {
    loadModel(scene, "./models/roman_pottery/scene.gltf", "Gốm La Mã");
  };

  const iphone_01 = (scene) => {
    loadModel(scene, "./models/iPhone_01.gltf", "iPhone 12 Pro Max");
  };

  const stamp = (scene) => {
    loadModel(scene, "./models/stamp_condau/scene.gltf", "Con đóng dấu");
  };

  return {
    ModelTypeWriter,
    binh_su,
    buddha_wood,
    batavialand,
    radio1950s,
    roman_pottery,
    iphone_01,
    stamp,
  };
}
