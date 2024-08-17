import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { SvgProps } from "react-native-svg";

const HomeSvg = (props: SvgProps) => {
    return (
      <Svg width={389} height={273} fill="none" {...props}>
        <Path
          fill="url(#a)"
          d="M389 273c-37.693-69.104-50.994-164.622-113-209C216.902 21.703-1 126.5-1 80.5V0h390v273Z"
        />
        <Defs>
          <LinearGradient
            id="a"
            x1={194}
            x2={194}
            y1={0}
            y2={273}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#1FBCFF" />
            <Stop offset={1} stopColor="#00DAB7" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  };

  export default HomeSvg