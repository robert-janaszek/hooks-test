import { useEffect, useState } from "react"

export interface WindowActivityConfig {
  onActivate?: () => void;
  onDeactivate?: () => void;
  onChange?: (isActive: boolean) => void;
}

export const isDocumentActive = () => !document.hidden;

export const useWindowActivity = (props?: WindowActivityConfig) => {
  const [isFirstRender, setFirstRender] = useState(true);
  const [isWindowVisible, setWindowVisibility] = useState(isDocumentActive());
  const handleWindowVisibilityChange = () => setWindowVisibility(isDocumentActive());
  useEffect(() => {
      document.addEventListener('visibilitychange', handleWindowVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleWindowVisibilityChange);
  }, []);
  
  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    if (isWindowVisible) {
      props?.onActivate?.();
      props?.onChange?.(true);
      return;
    }

    props?.onDeactivate?.();
    props?.onChange?.(false);
  }, [isWindowVisible]);

  return isWindowVisible;
}