import { useEffect, useState } from 'react';

export default function useMediaQuery(queryString) {
  const [isMatch, setIsMatch] = useState(false);
  const mqChange = (mq) => {
    setIsMatch(mq.matches);
  };

  useEffect(() => {
    const mq = window.matchMedia(queryString);
    mq.addEventListener('change', mqChange);
    mqChange(mq);

    return () => {
      mq.removeEventListener(mqChange);
    };
  }, [queryString]);

  return isMatch;
}
