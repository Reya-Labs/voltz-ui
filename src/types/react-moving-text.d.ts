declare module 'react-moving-text' {
  import React = require('react');
  const MovingComponent: React.FunctionComponent<{
    type:
      | 'blur'
      | 'fadeIn'
      | 'fadeOut'
      | 'hang'
      | 'hangOnLeft'
      | 'hangOnRight'
      | 'swing'
      | 'glowing'
      | 'shakeMix'
      | 'shakeHorizontal'
      | 'shakeVertical'
      | 'spin'
      | 'bounce'
      | 'flipCenterToRight'
      | 'flipFromLeftToCenter'
      | 'flash'
      | 'pulse'
      | 'jelly'
      | 'squeezeHorizontal'
      | 'squeezeVertical'
      | 'flipHorizontal'
      | 'flipVertical';
    //	s or ms
    duration: string;
    //	s or ms
    delay?: string;
    //	alternate
    direction?: string;
    //	animation-timing-function
    timing?: string;
    // animation-iteration-count
    iteration: number | 'infinite';
    // animation-fill-mode
    fillMode?: string;
  }>;
  export default MovingComponent;
}
