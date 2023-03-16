import React, { useEffect, useState } from "react";

function FullscreenWrapper({ children, timeout = 0 }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(()=>{
    const handleFullScreen = () => {
      // eslint-disable-next-line no-restricted-globals
      if(screen.height === window.innerHeight){
        setIsFullScreen(true);
      }else{
        setIsFullScreen(false);
      }
    }
    window.addEventListener("resize",handleFullScreen);
    return ()=>{
      window.removeEventListener("resize",handleFullScreen);
    }
  },[])
  useEffect(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      console.log("here");
      element.requestFullscreen();
      setIsFullScreen(true);
    }
  }, [timeout]);

  if (!isFullScreen) {
    return <div style={{ width: "100vw", height: "100vh" }}>Please Dont Exit fullscreen, This may lead to disqualification</div>;
  } else {
    return <>{children}</>;
  }
}

export default FullscreenWrapper;
