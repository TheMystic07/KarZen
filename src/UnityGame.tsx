import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function App() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "Build/KarZen.loader.js",
    dataUrl: "Build/KarZen.data",
    frameworkUrl: "Build/KarZen.framework.js",
    codeUrl: "Build/KarZen.wasm",
  });

  return (
    <>
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <div style={ {transform : "scale(1.5)"}}>
        
      <Unity 
        unityProvider={unityProvider}
        style={{ visibility: isLoaded ? "visible" : "hidden" , width: "100vw"  ,  transform: "scale(.5)"}}
      /> </div>
    </>
  );
}