import { useCabinetStore } from '@/store';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Camera controls for the scene
export function Controls() {
  // Get the necessary state and setters from the store
  const { cabinetSize, isDragging, isCameraLerp, setLerpCamera, selectedColumnIndex, setVisibleTools, isVerticalDragging } = useCabinetStore();
  
  // Track previous cabinet size to detect actual changes
  const prevSizeRef = useRef({ ...cabinetSize });
  
  // Track if user is currently controlling the camera
  const [userControlling, setUserControlling] = useState(false);

  // Create a reference to the controls
  const controlsRef = useRef(null);

  // Get the camera from the three.js context
  const { camera, gl } = useThree();

  // Callback function to handle the start of the control
  const onStartControl = useCallback(() => {
    setLerpCamera(false);
    setUserControlling(true);
    if (selectedColumnIndex === -1) {
      setVisibleTools(false);
    } else {
      setVisibleTools(true);
    }
  }, [setLerpCamera, selectedColumnIndex, setVisibleTools]);

  // Callback function to handle the end of the control
  const onEndControl = useCallback(() => {
    setUserControlling(false);
    if (selectedColumnIndex === -1) {
      setVisibleTools(true);
    }
  }, [selectedColumnIndex, setVisibleTools]);

  // Create the regular target position for the camera
  const regularTargetPos = new THREE.Vector3(0, cabinetSize.totalHeight / 2, 0);

  // Calculate the appropriate camera distance based on cabinet size
  const getCameraDistance = useCallback(() => {
    // Base the distance on the largest dimension (width or height)
    const maxDimension = Math.max(cabinetSize.totalWidth, cabinetSize.totalHeight);
    return maxDimension * 1.7; // Multiplier to ensure the entire cabinet is visible
  }, [cabinetSize]);

  // Calculate a height offset for the camera (30% of cabinet height)
  const cameraHeightOffset = useCallback(() => {
    return cabinetSize.totalHeight * 0.8;
  }, [cabinetSize.totalHeight]);

  // Set the camera to look at the target once on mount
  useEffect(() => {
    camera.lookAt(regularTargetPos);
  }, [camera, regularTargetPos]);

  // Disable lerp once on mount
  useEffect(() => {
    if (isCameraLerp) {
      setLerpCamera(false);
    }
  }, []);

  // Update camera position ONLY when cabinet size actually changes
  useEffect(() => {
    // Check if cabinet size has actually changed
    const sizeChanged = 
      prevSizeRef.current.totalWidth !== cabinetSize.totalWidth ||
      prevSizeRef.current.totalHeight !== cabinetSize.totalHeight ||
      prevSizeRef.current.totalDepth !== cabinetSize.totalDepth;
    
    // Only update camera if size changed and user is not controlling camera
    if (sizeChanged && !userControlling) {
      const distanceZ = getCameraDistance();
      const heightOffset = cameraHeightOffset();
      
      // Set camera position directly without animation, with added height
      camera.position.set(0, cabinetSize.totalHeight / 2 + heightOffset, distanceZ);
      camera.lookAt(regularTargetPos);
      
      // Force update the controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      console.log("Camera position updated for size change:", camera.position);
      
      // Update the previous size reference
      prevSizeRef.current = { ...cabinetSize };
    }
  }, [cabinetSize, camera, regularTargetPos, getCameraDistance, userControlling, cameraHeightOffset]);

  // Reset camera when a column is selected
  useEffect(() => {
    if (selectedColumnIndex !== -1) {
      // Use the same distance calculation as for cabinet size changes
      const distanceZ = getCameraDistance();
      const heightOffset = cameraHeightOffset();
      
      // Set camera position directly without animation, with added height
      camera.position.set(0, cabinetSize.totalHeight / 2 + heightOffset, distanceZ);
      camera.lookAt(regularTargetPos);
      
      // Force update the controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      console.log("Camera position set to:", camera.position);
    }
  }, [selectedColumnIndex, camera, cabinetSize, regularTargetPos, getCameraDistance, cameraHeightOffset]);

  // Prevent wheel events on the canvas to disable zoom
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [gl]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      enableDamping={false}  // Disable damping
      dampingFactor={0}      // Set damping factor to 0
      minPolarAngle={Math.PI / 2 - 0.5}
      maxPolarAngle={Math.PI / 2 + 0.5}
      target={regularTargetPos}
      onStart={onStartControl}
      onEnd={onEndControl}
      rotateSpeed={0.5}
      enabled={!isDragging && !isVerticalDragging} // Completely disable controls during any dragging
    />
  );
}
