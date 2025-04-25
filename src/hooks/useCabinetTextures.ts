import { useCabinetStore } from '@/store';
import { ECabinetFinishes, plywoodTextures, veneerTextures } from '@/utils/utilities';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export const useCabinetTextures = () => {
  const { cabinetFinish, cabinetTextureURL, setRoughnessMap, setAoMap, setNormalMap, setColorMap } = useCabinetStore();

  const isPlywood = cabinetFinish === ECabinetFinishes.PLYWOOD;

  // Performance optimization: Use lower anisotropy (8 is a good balance)
  const anisotropyLevel = 8;

  //-- VENEER TEXTURES
  // Veneer Roughness Map
  const veneerRoughnessMap = useTexture(veneerTextures.roughnessMap);
  veneerRoughnessMap.flipY = false;
  veneerRoughnessMap.wrapS = THREE.RepeatWrapping;
  veneerRoughnessMap.wrapT = THREE.RepeatWrapping;
  veneerRoughnessMap.repeat.set(0.8, 0.8);
  veneerRoughnessMap.anisotropy = anisotropyLevel;
  
  // Performance: Use mipmaps and optimize texture settings
  veneerRoughnessMap.minFilter = THREE.LinearMipmapLinearFilter;
  veneerRoughnessMap.generateMipmaps = true;

  // Veneer Ao Map
  const veenerAoMap = useTexture(veneerTextures.aoMap);
  veenerAoMap.flipY = false;
  veenerAoMap.wrapS = THREE.RepeatWrapping;
  veenerAoMap.wrapT = THREE.RepeatWrapping;
  veenerAoMap.repeat.set(0.8, 0.8);
  veenerAoMap.anisotropy = anisotropyLevel;
  veenerAoMap.minFilter = THREE.LinearMipmapLinearFilter;
  veenerAoMap.generateMipmaps = true;

  // Veneer Normal Map
  const veenerNormalMap = useTexture(veneerTextures.normalMap);
  veenerNormalMap.flipY = false;
  veenerNormalMap.wrapS = THREE.RepeatWrapping;
  veenerNormalMap.wrapT = THREE.RepeatWrapping;
  veenerNormalMap.repeat.set(0.8, 0.8);
  veenerNormalMap.anisotropy = anisotropyLevel;
  veenerNormalMap.minFilter = THREE.LinearMipmapLinearFilter;
  veenerNormalMap.generateMipmaps = true;

  //--PLYWOOD TEXTURES
  // Plywood Roughness Map
  const plywoodRoughnessMap = useTexture(plywoodTextures.roughnessMap);
  plywoodRoughnessMap.flipY = false;
  plywoodRoughnessMap.anisotropy = anisotropyLevel;
  plywoodRoughnessMap.minFilter = THREE.LinearMipmapLinearFilter;
  plywoodRoughnessMap.generateMipmaps = true;

  // Plywood Ao Map
  const plywoodAoMap = useTexture(plywoodTextures.aoMap);
  plywoodAoMap.flipY = false;
  plywoodAoMap.anisotropy = anisotropyLevel;
  plywoodAoMap.minFilter = THREE.LinearMipmapLinearFilter;
  plywoodAoMap.generateMipmaps = true;

  // Plywood Normal Map
  const plywoodNormalMap = useTexture(plywoodTextures.roughnessMap);
  plywoodNormalMap.flipY = false;
  plywoodNormalMap.anisotropy = anisotropyLevel;
  plywoodNormalMap.minFilter = THREE.LinearMipmapLinearFilter;
  plywoodNormalMap.generateMipmaps = true;

  //--ColorMap
  const colorMapFromState = useTexture(cabinetTextureURL);
  colorMapFromState.flipY = false;
  
  if (THREE.SRGBColorSpace !== undefined) {
    colorMapFromState.colorSpace = THREE.SRGBColorSpace;
  } else if (THREE.sRGBEncoding !== undefined) {
    colorMapFromState.encoding = THREE.sRGBEncoding;
  }
  
  colorMapFromState.anisotropy = anisotropyLevel;
  colorMapFromState.minFilter = THREE.LinearMipmapLinearFilter;
  colorMapFromState.generateMipmaps = true;
  
  // Apply the same texture wrapping settings regardless of material type
  // This ensures edges get properly textured
  colorMapFromState.wrapS = THREE.RepeatWrapping;
  colorMapFromState.wrapT = THREE.RepeatWrapping;
  colorMapFromState.repeat.set(0.8, 0.8);

  useEffect(() => {
    if (cabinetFinish === ECabinetFinishes.PLYWOOD) {
      setRoughnessMap(plywoodRoughnessMap);
      setAoMap(plywoodAoMap);
      setNormalMap(plywoodNormalMap);
    } else if (cabinetFinish === ECabinetFinishes.VENEER) {
      setRoughnessMap(veneerRoughnessMap);
      setAoMap(veenerAoMap);
      setNormalMap(veenerNormalMap);
    }
    setColorMap(colorMapFromState);
  }, [cabinetFinish, cabinetTextureURL]);
};
