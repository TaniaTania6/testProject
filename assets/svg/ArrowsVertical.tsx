import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowsVertical = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width}
    height={props.hwight}
    viewBox="0 0 562.392 562.391"
    {...props}>
    <Path
      d="M123.89 262.141h314.604c19.027 0 17.467-31.347 15.496-47.039-.605-4.841-3.636-11.971-6.438-15.967L303.965 16.533c-12.577-22.044-32.968-22.044-45.551 0L114.845 199.111c-2.803 3.996-5.832 11.126-6.438 15.967-1.977 15.698-3.544 47.063 15.483 47.063zM114.845 363.274l143.569 182.584c12.577 22.044 32.968 22.044 45.551 0l143.587-182.609c2.804-3.996 5.826-11.119 6.438-15.967 1.971-15.691 3.531-47.038-15.496-47.038H123.89c-19.027 0-17.46 31.365-15.483 47.062.612 4.841 3.635 11.971 6.438 15.968z"
      style={{
        fill: props.color,
      }}
    />
  </Svg>
);
export default ArrowsVertical;
