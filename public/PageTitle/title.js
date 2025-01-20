import { useEffect } from "react";

function useTitle(path) {
  useEffect(() => {
    document.title = `${path} || BrainShare`;
    return () => {};
  }, [path]);
}

export default useTitle;
