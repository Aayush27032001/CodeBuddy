import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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
  const toggleFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      console.log("here");
      element.requestFullscreen();
      setIsFullScreen(true);
    }
  }
  useEffect(() => {
    toggleFullScreen()
  }, [timeout]);

  if (!isFullScreen) {
    return <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection:"column" ,justifyContent: "center", alignItems: "center" }}>
        <Typography variant="body1" color="initial">Please Dont Exit fullscreen, This may lead to disqualification</Typography>
        <Button size="small" sx={{mt:"1rem"}} onClick={toggleFullScreen} variant="contained" color="primary">
          Go Back To Full Screen
        </Button>
      </div>;
  } else {
    return <>{children}</>;
  }
}

export default FullscreenWrapper;
