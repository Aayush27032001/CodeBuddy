import React, { useEffect } from "react";

const DisableDevTools = ({ children }) => {
  useEffect(() => {
    // Disable F12 key
    document.onkeydown = function (e) {
      if (e.key === "F12") {
        e.preventDefault();
        console.log("called");
        return false;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        console.log("escape");
        return false;
      }
      if (e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        return false;
      }
    };

    // Disable right-click context menu
    document.oncontextmenu = function (e) {
      e.preventDefault();
      return false;
    };

    // Disable inspector
    document.addEventListener("mousedown", (e) => {
      if (e.button === 1) {
        e.preventDefault();
        return false;
      }
    });

    // Check for devtools
    const devtoolsOpen = () => {
      const devtools = window.open("", "_blank");
      devtools.focus();
      devtools.close();
      return true;
    };
  }, []);

  return <>{children}</>;
};

export default DisableDevTools;
