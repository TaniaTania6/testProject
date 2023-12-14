import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowsHorizontal = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width}
    height={props.hwight}
    viewBox="0 0 32 32"
    {...props}>
    <Path
      d="M28 18c0 1.102-.898 2-2 2H7.992v-4L0 22l7.992 6v-4H26c3.309 0 6-2.695 6-6h-4zM6 12h18v4l8-6-8-6v4H6c-3.309 0-6 2.688-6 6h4c0-1.102.898-2 2-2z"
      style={{
        fill: props.color,
      }}
    />
  </Svg>
);
export default ArrowsHorizontal;
