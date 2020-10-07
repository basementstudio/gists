import { useState, useEffect, useCallback } from "react";
import useComponentId from "hooks/useComponentId";
import Popper from "./popper";

export type DropdownProps = {
  isOpen: boolean;
  width?: string;
  close: () => void;
  offsetX?: number | undefined;
  offsetY?: number;
} & React.ComponentPropsWithoutRef<typeof Popper>;

const Dropdown: React.FC<DropdownProps> = ({
  children,
  isOpen,
  close,
  width = "200px",
  pushSx,
  ...popperProps
}) => {
  const componentId = useComponentId();

  const handleClick = useCallback(
    (e: any) => {
      const isInside =
        e?.target?.closest(`[data-component-id='${componentId}']`) !== null;
      if (isInside) return;
      close();
      document.removeEventListener("click", handleClick);
    },
    [close, componentId]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [handleClick, isOpen]);

  if (!isOpen) return null;
  return (
    <Popper
      {...popperProps}
      data-component-id={componentId}
      options={{
        strategy: "fixed",
        placement: "bottom-start",
        ...popperProps.options,
      }}
      offsetY={popperProps.offsetY ?? 12}
    >
      <div style={{ width }}>{children}</div>
    </Popper>
  );
};

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};

export default Dropdown;
export { useDropdown };
