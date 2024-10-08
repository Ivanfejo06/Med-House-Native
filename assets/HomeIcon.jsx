import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = (props) => (
  <Svg
    width={props.width || 24}  // Ajustable desde el componente padre
    height={props.height || 24}  // Ajustable desde el componente padre
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20 2.21139L37.9999 17.6399V36C37.9999 36.5304 37.7892 37.0391 37.4141 37.4142C37.0391 37.7893 36.5303 38 35.9999 38H25.9999V30.6667C25.9999 29.0754 25.3678 27.5493 24.2426 26.4241C23.1174 25.2988 21.5912 24.6667 20 24.6667C18.4087 24.6667 16.8825 25.2988 15.7573 26.4241C14.6321 27.5493 14 29.0754 14 30.6667V38H3.99999C3.46956 38 2.96086 37.7893 2.58578 37.4142C2.21071 37.0391 2 36.5304 2 36V17.6399L20 2.21139Z"
      stroke={props.tintColor || "#A8A8A8"}  // Color ajustable
      strokeWidth={4}
    />
  </Svg>
);

export default HomeIcon;