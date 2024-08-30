import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DonacionesIcon = (props) => (
  <Svg
    width={props.width || 24}  // Ajustable desde el componente padre
    height={props.height || 24}  // Ajustable desde el componente padre
    viewBox="0 0 42 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.47018 21.8473L2.0307 8.47164C1.6184 4.64368 5.43636 1.83176 8.80866 3.4825L37.2742 17.4019C40.9086 19.1781 40.9086 24.5166 37.2742 26.2928L8.80866 40.2146C5.43636 41.8629 1.6184 39.0535 2.0307 35.2255L3.47018 21.8473ZM3.47018 21.8473H20.1529"
      stroke={props.tintColor || "#A8A8A8"}  // Color ajustable
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DonacionesIcon;