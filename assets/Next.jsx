import * as React from "react"
import Svg, { Path } from "react-native-svg";

const Next = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}  // Ajustable desde el componente padre
    height={props.height || 24}  // Ajustable desde el componente padre
    fill="none"
    {...props}
  >
    <Path
      stroke={props.tintColor || "#1E98A8"}  // Color ajustable
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 17 8-8-8-8"
    />
  </Svg>
)
export default Next