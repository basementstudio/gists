import { useKeenSlider } from "keen-slider/react";
import { TOptionsEvents } from "keen-slider";
import {
  useEffect,
  useState,
  useCallback,
  Children,
  isValidElement
} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import cn from "classnames";

import styles from "./styles.module.css";

// IMPORTANT
// Check out the dependencies
// Children should be able to receive a className prop
// You'll need to import "keen-slider/keen-slider.min.css" somewhere (_app for nextjs)

type Breakpoint = {
  value: string;
  slidesPerView: number;
};

type Props = {
  config?: TOptionsEvents;
  className?: string;
  breakpoints?: Breakpoint[];
  withArrowControls?: boolean;
};

const keenSliderGridDefaultBreakpoints: Breakpoint[] = [
  { value: "320px", slidesPerView: 1 },
  { value: "664px", slidesPerView: 2 },
  { value: "1152px", slidesPerView: 3 },
  { value: "1552px", slidesPerView: 4 },
  { value: "1852px", slidesPerView: 5 }
];

const getMedia = (value: string) => `(min-width: ${value})`;

const KeenSliderGrid: React.FC<Props> = ({
  children,
  config,
  className,
  breakpoints = keenSliderGridDefaultBreakpoints,
  withArrowControls = false
}) => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  const [sliderRef, slider] = useKeenSlider({
    slidesPerView,
    duration: 1000,
    spacing: 20,
    ...config
  });

  const handleScreenSizeChange = useCallback(() => {
    const matches = breakpoints.filter(
      ({ value }) => window.matchMedia(getMedia(value)).matches
    );
    const last = matches[matches.length - 1];
    if (last) {
      setSlidesPerView(last.slidesPerView);
      if (sliderRef.current) {
        if (last.slidesPerView > 3) {
          const addedWidth = (last.slidesPerView - 3) * 25;
          const newWidth = `${100 + addedWidth}%`;
          const newLeft = `-${addedWidth / 2}%`;
          sliderRef.current.style.width = newWidth;
          sliderRef.current.style.left = newLeft;
        } else {
          sliderRef.current.style.width = "100%";
          sliderRef.current.style.left = "0";
        }
      }
    }
  }, [breakpoints, sliderRef]);

  useEffect(() => {
    handleScreenSizeChange();
    const mediaQueryLists: MediaQueryList[] = [];
    breakpoints.forEach(({ value }) => {
      const mql = window.matchMedia(getMedia(value));
      mediaQueryLists.push(mql);
      if (mql.addEventListener) {
        mql.addEventListener("change", handleScreenSizeChange);
      } else if (mql.addListener) {
        mql.addListener(handleScreenSizeChange);
      }
    });

    return () => {
      mediaQueryLists.forEach((mql) => {
        if (mql.removeEventListener) {
          mql.removeEventListener("change", handleScreenSizeChange);
        } else if (mql.addListener) {
          mql.removeListener(handleScreenSizeChange);
        }
      });
    };
  }, [breakpoints]);

  return (
    <>
      <div
        className={cn("keen-slider", styles.container, className)}
        ref={sliderRef as React.RefObject<HTMLDivElement>}
      >
        {Children.map(children, (child) => {
          // Add the keen-slider__slide className to children
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className} ` : ""
                }keen-slider__slide`
              }
            };
          }
          return child;
        })}
      </div>
      {withArrowControls && (
        <div className={styles.arrowControlsContainer}>
          <button className={styles.arrowControlsButton} onClick={slider?.prev}>
            <FiChevronLeft />
          </button>
          <button className={styles.arrowControlsButton} onClick={slider?.next}>
            <FiChevronRight />
          </button>
        </div>
      )}
    </>
  );
};

export default KeenSliderGrid;
export { keenSliderGridDefaultBreakpoints };
