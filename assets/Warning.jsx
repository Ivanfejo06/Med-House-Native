import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Warning = (props) => (
  <Svg
    width={props.width || 24}  // Ajustable desde el componente padre
    height={props.height || 24}  // Ajustable desde el componente padre
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10 0.5C15.523 0.5 20 4.977 20 10.5C20 16.023 15.523 20.5 10 20.5C4.477 20.5 0 16.023 0 10.5C0 4.977 4.477 0.5 10 0.5ZM10 13.5C9.73478 13.5 9.48043 13.6054 9.29289 13.7929C9.10536 13.9804 9 14.2348 9 14.5C9 14.7652 9.10536 15.0196 9.29289 15.2071C9.48043 15.3946 9.73478 15.5 10 15.5C10.2652 15.5 10.5196 15.3946 10.7071 15.2071C10.8946 15.0196 11 14.7652 11 14.5C11 14.2348 10.8946 13.9804 10.7071 13.7929C10.5196 13.6054 10.2652 13.5 10 13.5ZM10 4.5C9.75507 4.50003 9.51866 4.58996 9.33563 4.75272C9.15259 4.91547 9.03566 5.13975 9.007 5.383L9 5.5V11.5C9.00028 11.7549 9.09788 12 9.27285 12.1854C9.44782 12.3707 9.68695 12.4822 9.94139 12.4972C10.1958 12.5121 10.4464 12.4293 10.6418 12.2657C10.8373 12.1021 10.9629 11.8701 10.993 11.617L11 11.5V5.5C11 5.23478 10.8946 4.98043 10.7071 4.79289C10.5196 4.60536 10.2652 4.5 10 4.5Z"
      fill={props.fill || "#FFB433"}
    />
  </Svg>
);
export default Warning;
