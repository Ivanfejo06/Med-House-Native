import * as React from "react";
import Svg, { Rect } from "react-native-svg";
const Hang = (props) => (
  <Svg
    width={props.width || 50}  // Ajustable desde el componente padre
    height={props.height || 4}  // Ajustable desde el componente padre
    viewBox="0 0 30 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={30} height={4} rx={2} fill={props.tintColor || "#C0C0C0"} />
  </Svg>
);
export default Hang;