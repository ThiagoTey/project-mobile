import { View, Text } from 'react-native'

type ProductimageProps = {
    description: string;
    url?: string;
    customStyles?: string;
    textStyles?: string;
}

const ProductImage = ({description, url, customStyles,textStyles}:ProductimageProps) => {
  return (
    <View className={`justify-center items-center ${customStyles}`}>
      <Text className={textStyles}>Ab</Text>
    </View>
  )
}

export default ProductImage