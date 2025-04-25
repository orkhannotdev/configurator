import * as THREE from 'three';

export const getModelSize = ({ model }: { model: THREE.Group<THREE.Object3DEventMap> }) => {
  const box = new THREE.Box3().setFromObject(model);
  const modelSize = box.getSize(new THREE.Vector3());
  const width = Number(modelSize.x.toFixed(2));
  const height = Number(modelSize.y.toFixed(2));
  const length = Number(modelSize.z.toFixed(2));

  return {
    width,
    height,
    length,
  };
};
