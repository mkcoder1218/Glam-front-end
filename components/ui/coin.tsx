import React from 'react';

const CoinsIcon = ({
  size = 48,
  color = '#000000',
  strokeWidth = undefined,
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push('scaleX(-1)');
  if (flipVertical) transforms.push('scaleY(-1)');

  const viewBoxSize = 24 + (padding * 2);
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity,
        transform: transforms.join(' ') || undefined,
        filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
        backgroundColor: background !== 'transparent' ? background : undefined
      }}
    >
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" {strokeWidth}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4"/><path d="m16.71 13.88l.7.71l-2.82 2.82"/></g>
    </svg>
  );
};

export default CoinsIcon;