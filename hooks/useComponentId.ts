import { useRef } from "react";
import casualUid from "utils/uid";

const useComponentId = () => {
  const { current: componentId } = useRef(casualUid());

  return componentId;
};

export default useComponentId;
