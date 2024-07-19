import { View, Text } from 'react-native'

type ProductimageProps = {
    description: string;
    url?: string;
    customStyles?: string;
    textStyles?: string;
}

const ProductImage = ({description, url, customStyles,textStyles}:ProductimageProps) => {

  const firstTwoLetters = description.substring(0, 2);

  return (
    <View className={`justify-center items-center ${customStyles}`}>
      <Text className={textStyles}>{firstTwoLetters}</Text>
    </View>
  )
}

export default ProductImage