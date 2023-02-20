import React, { useEffect, useState } from "react";

function FullscreenWrapper({ children, timeout = 0 }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      console.log("here");
      element.requestFullscreen();
      setIsFullscreen(true);
    }
  }, [timeout]);

  if (isFullscreen) {
    return <div style={{ width: "100vw", height: "100vh" }}>{children}</div>;
  } else {
    return children;
  }
}

export default FullscreenWrapper;
