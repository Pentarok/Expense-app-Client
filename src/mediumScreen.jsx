import { useState, useEffect } from "react";

function useIsMediumScreen() {
  const [isMd, setIsMd] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMd;
}

export default useIsMediumScreen;
