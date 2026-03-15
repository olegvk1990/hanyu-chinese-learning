import { useCallback, useRef } from 'react';

/**
 * Custom hook for touch swipe detection.
 * @param {Object} options
 * @param {Function} [options.onSwipeLeft] - Callback when user swipes left
 * @param {Function} [options.onSwipeRight] - Callback when user swipes right
 * @param {Function} [options.onSwipeUp] - Callback when user swipes up
 * @param {Function} [options.onSwipeDown] - Callback when user swipes down
 * @param {number} [options.threshold=50] - Minimum distance in px to trigger swipe
 * @returns {React.RefObject} - Ref to attach to the element
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
} = {}) {
  const touchStart = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    if (touch) {
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX >= threshold || absY >= threshold) {
        if (absX > absY) {
          if (deltaX < 0) onSwipeLeft?.();
          else onSwipeRight?.();
        } else {
          if (deltaY < 0) onSwipeUp?.();
          else onSwipeDown?.();
        }
      }
    },
    [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]
  );

  const ref = useRef(null);

  const setRef = useCallback(
    (node) => {
      if (ref.current) {
        ref.current.removeEventListener('touchstart', handleTouchStart);
        ref.current.removeEventListener('touchend', handleTouchEnd);
      }
      ref.current = node;
      if (node) {
        node.addEventListener('touchstart', handleTouchStart, { passive: true });
        node.addEventListener('touchend', handleTouchEnd, { passive: true });
      }
    },
    [handleTouchStart, handleTouchEnd]
  );

  return setRef;
}
