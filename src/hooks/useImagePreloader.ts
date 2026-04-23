import { useState, useEffect } from 'react';

export const useImagePreloader = (imageArray: string[]) => {
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const total = imageArray.length;

    if (total === 0) {
      setIsReady(true);
      setPercentLoaded(100);
      return;
    }

    let isMounted = true;

    imageArray.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setPercentLoaded(Math.floor((loadedCount / total) * 100));
        if (loadedCount === total) setIsReady(true);
      };
      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        setPercentLoaded(Math.floor((loadedCount / total) * 100));
        if (loadedCount === total) setIsReady(true);
      };
    });

    return () => {
      isMounted = false;
    };
  }, [imageArray]);

  return { isReady, percentLoaded };
};
