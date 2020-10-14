import { useEffect, useState } from 'react';
import Router from 'next/router';

const DONE_DURATION = 400;

const RouteChangeIndicator = () => {
  const [loading, setLoading] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const onLoad = () => setLoading(true);
  const onDone = () => {
    setLoading(false);
    setTimeoutId(
      setTimeout(() => {
        setTimeoutId(null);
        setLoading(null);
      }, DONE_DURATION)
    );
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', onLoad);
    Router.events.on('routeChangeComplete', onDone);
    Router.events.on('routeChangeError', onDone);

    return () => {
      Router.events.off('routeChangeStart', onLoad);
      Router.events.off('routeChangeComplete', onDone);
      Router.events.off('routeChangeError', onDone);
    };
  });

  useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId]
  );

  return (
    <div className={loading === null ? '' : loading ? 'loading' : 'done'}>
      <style jsx>{`
        div {
          background-color: var(--black);
          height: 2px;
          left: 0;
          opacity: 0;
          pointer-events: none;
          position: fixed;
          right: 100%;
          top: 0;
          transition-duration: 0s;
          transition-property: right, opacity;
          z-index: 2;
        }
        .loading {
          opacity: 1;
          right: 5%;
          transition-duration: 8s, 0s;
          transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .done {
          right: 0;
          transition-delay: 0s, ${DONE_DURATION}ms;
          transition-duration: ${DONE_DURATION}ms;
        }
      `}</style>
    </div>
  );
};

export default RouteChangeIndicator;
