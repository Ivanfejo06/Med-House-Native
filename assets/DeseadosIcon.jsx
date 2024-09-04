import * as React from "react";
import Svg, { Path } from "react-native-svg";

const DeseadosIcon = (props) => (
  <Svg
    width={props.width || 58}
    height={props.height || 58}
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M30.1053 50.48L30.3701 50.1913C37.236 43.4156 43.0328 37.6917 47.1013 32.5103C51.1689 27.33 53.7 22.4614 53.7 17.3842C53.7 10.3584 48.7974 4.82153 42.05 4.82153C37.2778 4.82153 32.7064 7.92715 30.6919 12.2809H27.3081C25.2936 7.92715 20.7222 4.82153 15.95 4.82153C9.20261 4.82153 4.3 10.3584 4.3 17.3842C4.3 22.4612 6.83101 27.3298 10.8947 32.5098C14.9538 37.6839 20.7331 43.3994 27.572 50.1628L27.6252 50.2154L27.6262 50.2164L27.9442 50.5315L29.0515 51.6286L30.1053 50.48ZM27.8215 7.50239L29 8.99894L30.1785 7.50239C33.0833 3.81349 37.5076 1.5 42.05 1.5C50.0363 1.5 56.5 8.32353 56.5 17.3842C56.5 22.8898 54.2343 27.9972 50.0031 33.6393C45.7525 39.3072 39.6455 45.3535 32.1506 52.7609L32.1485 52.763L29 55.8869L25.8515 52.763L25.8494 52.7609C18.3545 45.3535 12.2475 39.3072 7.99691 33.6393C3.76566 27.9972 1.5 22.8898 1.5 17.3842C1.5 8.32353 7.96369 1.5 15.95 1.5C20.4924 1.5 24.9167 3.81349 27.8215 7.50239Z"
      fill={props.fill || "#A8A8A8"}
      stroke={props.stroke || "#A8A8A8"}
      strokeWidth={props.strokeWidth || 3}
    />
  </Svg>
);

export default DeseadosIcon;