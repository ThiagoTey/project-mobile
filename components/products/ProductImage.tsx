import { View } from "react-native";
import ThemedText from "../typography/ThemedText";
import { colors } from "@/constants";

type Props = {
  description: string;
  url?: string;
  customStyles?: string;
  textStyles?: string;
};

const ProductImage = ({
  description,
  url,
  customStyles,
  textStyles,
}: Props) => {
  const firstTwoLetters = description.substring(0, 2);

  return (
    <View
      style={{ backgroundColor: colors.neutral }}
      className={`justify-center items-center ${customStyles}`}
    >
      <ThemedText className={textStyles}>{firstTwoLetters}</ThemedText>
    </View>
  );
};

export default ProductImage;
