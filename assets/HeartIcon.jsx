import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HeartIcon = ({
  width = 24,
  height = 24,
  tintColor = "#1E98A8",
  strokecolor = "",
  ...props
}) => (
  <Svg
    width={width}  // Ajustable desde el componente padre
    height={height}  // Ajustable desde el componente padre
    viewBox="0 0 108 108"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Trazo exterior */}
    <Path
      d="M76.5 4C67.8 4 59.45 8.41417 54 15.3351C48.55 8.41417 40.2 4 31.5 4C16.1 4 4 17.1335 4 33.9728C4 54.5177 21 71.357 46.75 96.8065L54 104L61.25 96.8065C87 71.357 104 54.5177 104 33.9728C104 17.1335 91.9 4 76.5 4Z"
      fill={tintColor}  // Color ajustable
      stroke={strokecolor}  // Color ajustable
      strokeWidth={0}  // Ancho del trazo externo
    />
    {/* Trazo interior */}
    <Path
      d="M76.5 4C67.8 4 59.45 8.41417 54 15.3351C48.55 8.41417 40.2 4 31.5 4C16.1 4 4 17.1335 4 33.9728C4 54.5177 21 71.357 46.75 96.8065L54 104L61.25 96.8065C87 71.357 104 54.5177 104 33.9728C104 17.1335 91.9 4 76.5 4Z"  // Color de relleno
      stroke={strokecolor}  // Color igual al relleno
      strokeWidth={10}  // Ancho del trazo interior
      // Este Path debe ser un poco más pequeño que el exterior
    />
  </Svg>
);

export default HeartIcon;