import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Rect, Path } from "react-native-svg";

const { height } = Dimensions.get('window');
const LOGO_HEIGHT = height * 0.1009;
const LOGO_WIDTH = height * 0.24647;
const scaleX = 1;
const scaleY = 1;

const Logo = (props) => (
  <Svg
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    viewBox="0 0 2434 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ transform: [{ rotate: '180deg' }] }} // Rotación de 180 grados
  >
    <Rect
      x={1433.33 * scaleX}
      y={177.777 * scaleY}
      width={133.333 * scaleX}
      height={666.667 * scaleY}
      fill="#1E99A9"
    />
    <Rect
      x={1144.44 * scaleX}
      y={155.555 * scaleY}
      width={133.333 * scaleX}
      height={688.889 * scaleY}
      fill="#1E99A9"
    />
    <Rect
      x={877.776 * scaleX}
      y={155.555 * scaleY}
      width={133.333 * scaleX}
      height={666.667 * scaleY}
      fill="#1E99A9"
    />
    <Rect
      x={2211.11 * scaleX}
      y={333.334 * scaleY}
      width={133.333 * scaleX}
      height={333.333 * scaleY}
      fill="#1E99A9"
    />
    <Rect
      x={77.7783 * scaleX}
      y={333.334 * scaleY}
      width={133.333 * scaleX}
      height={333.333 * scaleY}
      fill="#1E99A9"
    />
    <Path
      d={`M2333.33 ${800 * scaleY}C2396.62 ${785.233 * scaleY} 2419.87 ${768.417 * scaleY} 2422.22 ${711.111 * scaleY}C2425 ${641.514 * scaleY} 2405.79 ${626.737 * scaleY} 2333.33 ${611.111 * scaleY}C2193.23 ${599.653 * scaleY} 2128.7 ${571.383 * scaleY} 2044.44 ${477.778 * scaleY}C1709.57 ${99.7005 * scaleY} 1534.58 ${22.4582 * scaleY} 1233.33 0C886.787 ${4.74027 * scaleY} 704.614 ${108.922 * scaleY} 400 ${477.778 * scaleY}C330.701 ${555.496 * scaleY} 269.506 ${581.975 * scaleY} 122.222 ${600 * scaleY}C32.1964 ${608.23 * scaleY} 7.72925 ${635.952 * scaleY} 0 ${711.111 * scaleY}C10.2211 ${789.521 * scaleY} 44.6982 ${800.017 * scaleY} 122.222 ${800 * scaleY}C359.421 ${769.64 * scaleY} 472.531 ${686.906 * scaleY} 655.556 ${477.778 * scaleY}C823.341 ${282.613 * scaleY} 944.862 ${212.279 * scaleY} 1233.33 ${188.889 * scaleY}C1464.5 ${210.722 * scaleY} 1587.39 ${256.071 * scaleY} 1777.78 ${477.778 * scaleY}C1997.42 ${707.757 * scaleY} 2119.55 ${798.189 * scaleY} 2333.33 ${800 * scaleY}Z`}
      fill="#00EDDF"
    />
    <Path
      d={`M100.255 ${200 * scaleY}C36.9656 ${214.767 * scaleY} 13.7144 ${231.583 * scaleY} 11.366 ${288.889 * scaleY}C8.59131 ${358.486 * scaleY} 27.802 ${373.263 * scaleY} 100.255 ${388.889 * scaleY}C240.358 ${400.347 * scaleY} 304.889 ${428.617 * scaleY} 389.144 ${522.222 * scaleY}C724.014 ${900.3 * scaleY} 899.011 ${977.542 * scaleY} 1200.25 1000C1546.8 ${995.26 * scaleY} 1728.97 ${891.078 * scaleY} 2033.59 ${522.222 * scaleY}C2102.89 ${444.504 * scaleY} 2164.08 ${418.025 * scaleY} 2311.37 ${400 * scaleY}C2401.39 ${391.77 * scaleY} 2425.86 ${364.048 * scaleY} 2433.59 ${288.889 * scaleY}C2423.37 ${210.479 * scaleY} 2388.89 ${199.983 * scaleY} 2311.37 ${200 * scaleY}C2074.17 ${230.36 * scaleY} 1961.06 ${313.094 * scaleY} 1778.03 ${522.222 * scaleY}C1610.25 ${717.387 * scaleY} 1488.73 ${787.721 * scaleY} 1200.25 ${811.111 * scaleY}C969.083 ${789.278 * scaleY} 846.2 ${743.929 * scaleY} 655.81 ${522.222 * scaleY}C436.166 ${292.243 * scaleY} 314.035 ${201.811 * scaleY} 100.255 ${200 * scaleY}Z`}
      fill="#1E99A9"
    />
  </Svg>
);

export default Logo;