import { useCallback, useRef, useState } from "react";
import Popper, { PopperProps } from "./Popper";
import { Placement } from "@popperjs/core";

type Props = Pick<PopperProps, "offsetX" | "offsetY"> & {
  tooltipContent: React.ReactNode;
  placement?: Placement;
};

const Tooltip: React.FC<Props> = ({
  children,
  tooltipContent,
  placement,
  offsetX,
  offsetY,
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShow(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <span
        ref={spanRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      <Popper
        anchor={spanRef}
        options={{ placement: placement ?? "top", strategy: "fixed" }}
        offsetX={offsetX ?? 4}
        offsetY={offsetY ?? 4}
        style={{ pointerEvents: show ? "all" : "none" }}
      >
        <div
          style={{
            opacity: show ? 1 : 0,
            visibility: show ? "visible" : "hidden",
            background: "white",
            color: "black",
            transition: "opacity 0.05s",
            transitionDelay: "0.2s",
            width: "max-content",
          }}
        >
          {tooltipContent}
        </div>
      </Popper>
    </>
  );
};

export default Tooltip;
