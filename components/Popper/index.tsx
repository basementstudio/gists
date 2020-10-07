import { useCallback, useRef, useState } from "react";
import Portal from "./Portal";
import { createPopper, Modifier, Options } from "@popperjs/core";
import { usePopper } from "react-popper";

// NOTE
// This component relies on the lib react-popper
// The popper component is a useful primitive to create Dropdowns and Tooltips

type PopperOptions = Omit<Partial<Options>, "modifiers"> & {
  createPopper?: typeof createPopper;
  modifiers?: Partial<Modifier<unknown, Record<string, unknown>>>[];
};

type Props = {
  anchor: React.RefObject<HTMLElement> | HTMLElement | Element | string;
  children?: React.ReactNode;
  options?: PopperOptions;
  offset?: number | string;
  offsetX?: number | string;
  offsetY?: number | string;
} & React.ComponentPropsWithoutRef<"div">;

const Popper = ({
  anchor,
  children,
  options,
  offset,
  offsetX,
  offsetY,
  ...moreProps
}: Props) => {
  const popperElementRef = useRef<HTMLDivElement>(null);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const getAnchorElement = useCallback(() => {
    if (typeof anchor === "string") {
      setAnchorElement(document.querySelector(anchor) as HTMLElement | null);
    } else if ((anchor as HTMLElement).style) {
      setAnchorElement(anchor as HTMLElement);
    } else {
      setAnchorElement(
        (anchor as React.RefObject<HTMLElement>).current as HTMLElement
      );
    }
  }, [anchor]);

  const { styles, attributes } = usePopper(
    anchorElement,
    popperElementRef.current,
    options
  );

  return (
    <Portal onMount={getAnchorElement}>
      <div
        {...moreProps}
        ref={popperElementRef}
        style={{
          ...styles.popper,
          paddingTop: offsetY ?? offset,
          paddingRight: offsetX ?? offset,
          paddingBottom: offsetY ?? offset,
          paddingLeft: offsetX ?? offset,
          ...moreProps.style,
        }}
        {...attributes.popper}
      >
        {children}
      </div>
    </Portal>
  );
};

export default Popper;
