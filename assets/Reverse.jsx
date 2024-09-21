import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Reverse = (props) => (
  <Svg
    width={props.width || 24}  // Ajustable desde el componente padre
    height={props.height || 24}  // Ajustable desde el componente padre
    viewBox="0 0 18 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.324 5.95484C4.05907 5.21736 4.93269 4.63247 5.8946 4.2338C6.85651 3.83514 7.88775 3.63056 8.929 3.63184C11.0318 3.63211 13.0484 4.46757 14.5354 5.95449C16.0223 7.4414 16.8577 9.45802 16.858 11.5608C16.8577 13.6646 16.0226 15.6822 14.536 17.1707C13.0493 18.6592 11.0327 19.4969 8.929 19.4998C6.82509 19.4969 4.80834 18.6591 3.32168 17.1704C1.83502 15.6817 0.999998 13.6638 1 11.5598"
      stroke={props.tintColor || "white"}  // Color ajustable
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M4.04923 1L3.09923 4.858C3.01491 5.19997 3.06968 5.56143 3.25152 5.86307C3.43337 6.16471 3.72744 6.38191 4.06923 6.467L7.93823 7.415"
      stroke={props.tintColor || "white"}  // Color ajustable
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Reverse;
