import { ImageProps } from "react-native";

declare module '*.png' {
    const value: ImageProps;
    export default value;
  }