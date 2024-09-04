import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AuthIcon = (props) => (
  <Svg
    width={props.width || 24}  // Ajustable desde el componente padre
    height={props.height || 24}  // Ajustable desde el componente padre
    viewBox="0 0 57 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M41.7256 8.42763L41.7256 8.42759L41.7201 8.42523C37.6074 6.66377 33.6373 4.59426 29.8445 2.23484L29.8445 2.23482L29.8408 2.23261L28.7605 1.57321L28.4937 1.4104L28.2305 1.57885L27.1725 2.25592C23.3805 4.61464 19.4113 6.68358 15.2996 8.44462L15.2996 8.4446L15.2949 8.44667C11.1091 10.2905 6.77998 11.7992 2.34925 12.958L0.878676 13.3259L0.5 13.4206V13.8109V29.9855C0.5 43.1623 7.24906 52.2111 13.9961 57.9588C17.369 60.8321 20.7478 62.8869 23.299 64.2297C24.5752 64.9014 25.6457 65.3957 26.407 65.7258C26.7877 65.8908 27.0911 66.0149 27.3043 66.0995C27.4109 66.1418 27.4949 66.1742 27.5546 66.197C27.5751 66.2048 27.5973 66.2132 27.6156 66.2201C27.6409 66.2296 27.6588 66.2363 27.6546 66.2347L27.6546 66.2349L27.6676 66.2394L28.3355 66.4722L28.5 66.5295L28.6645 66.4722L29.3004 66.2506C29.3138 66.2473 29.3262 66.2439 29.3364 66.2411C29.3631 66.2335 29.3938 66.2238 29.4263 66.213C29.4923 66.1911 29.5807 66.1598 29.689 66.1195C29.9064 66.0385 30.2126 65.9179 30.5947 65.7561C31.359 65.4325 32.4314 64.9427 33.7084 64.2738C36.2614 62.9367 39.6399 60.8804 43.0117 58.0021C49.7564 52.2445 56.5 43.1714 56.5 29.9855V13.8109V13.4206L56.1213 13.3259L54.6542 12.9589C54.6532 12.9587 54.6522 12.9584 54.6513 12.9582C50.2267 11.7921 45.9043 10.277 41.7256 8.42763ZM51.5714 29.9855C51.5714 40.4799 46.7457 47.9248 41.4157 52.9577C36.2404 57.8444 30.6037 60.4413 28.5 61.3095C26.3966 60.4412 20.7598 57.8396 15.5844 52.9505C10.2542 47.9151 5.42857 40.4701 5.42857 29.9855V17.194C9.46709 16.0303 13.422 14.5998 17.2665 12.9122C21.1345 11.2612 24.8873 9.35862 28.5 7.21695C32.1127 9.35863 35.8655 11.2613 39.7336 12.9122C43.5781 14.5998 47.5329 16.0303 51.5714 17.194V29.9855Z"
      fill={props.tintColor || "#A8A8A8"}  // Color ajustable
      stroke={props.tintColor || "#A8A8A8"}  // Color ajustable
    />
  </Svg>
);

export default AuthIcon;