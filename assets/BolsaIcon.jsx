import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BolsaIcon = (props) => (
  <Svg
    width={props.width || 24}  // Ajustable desde el componente padre
    height={props.height || 24}  // Ajustable desde el componente padre
    viewBox="0 0 37 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M32.125 32.56V32.1C32.025 31.76 31.925 31.26 31.785 30.64C31.505 29.38 31.045 27.7 30.385 25.9C29.125 22.46 27.285 19.48 25.065 18H11.185C8.965 19.48 7.125 22.46 5.865 25.9C5.205 27.7 4.745 29.38 4.465 30.64C4.325 31.26 4.225 31.76 4.125 32.1V32.58L4.065 32.78L4.025 32.9C4.005 33 4.005 33.1 4.005 33.26C4.005 33.58 4.065 33.92 4.205 34.22C4.305 34.42 5.125 36 10.125 36H26.125C31.125 36 31.945 34.42 32.045 34.22C32.185 33.92 32.245 33.58 32.245 33.26C32.245 33.1 32.245 33 32.225 32.9L32.185 32.78L32.125 32.58V32.56ZM0.125 32C0.125 32 2.125 18 10.125 14H26.125C34.125 18 36.125 32 36.125 32C36.125 32 38.125 40 26.125 40H10.125C-1.875 40 0.125 32 0.125 32ZM14.125 4L18.125 0L22.125 4L30.125 0L26.125 10H10.125L6.125 0L14.125 4Z"
      fill={props.tintColor || "#A8A8A8"}  // Color ajustable
    />
  </Svg>
);

export default BolsaIcon;