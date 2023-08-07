import { useState } from "react";

/**
 * Hook that encapsulates the logic of the
 * App Button component
 */
const useAppButton = (animDelay: number, action: () => void) => {
  const [justRendered, setjustRendered] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(animDelay);

  const handleMouseEnter = () => {
    setAnimationDelay(0);
    setjustRendered(false);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const handleClick = () => {
    action();
  };

  const handleHoverState = (
    baseState: any,
    animatedState: any
  ): number | number[] =>
    justRendered
      ? baseState
      : hovering
      ? [baseState, animatedState]
      : [animatedState, baseState];

  return {
    state: {
      justRendered,
      hovering,
      animationDelay,
    },
    functions: {
      handleMouseEnter,
      handleMouseLeave,
      handleHoverState,
      handleClick,
    },
  };
};

export default useAppButton;
