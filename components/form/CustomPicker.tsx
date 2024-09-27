import { View, StyleSheet, Modal, Dimensions, Image } from "react-native";
import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import ThemedText from "../typography/ThemedText";
import { fonts, images } from "@/constants";

type Props = {};

const { width, height } = Dimensions.get("window");

const CustomPicker = (props: Props) => {
  const data = [{ value: "Teste Empresa" }];
  const [selectedValue, setSelectedValue] = useState(data[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });
  const pickerRef = useRef<TouchableOpacity | null>(null);

  const toggleDropDown = () => {
    setIsOpen(true);
    if (pickerRef.current) {
      pickerRef.current.measure(
        (
          fx: number,
          fy: number,
          width: number,
          height: number,
          px: number,
          py: number
        ) => {
          setDropDownPosition({ top: py + height, left: px });
        }
      );
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          {
            borderRadius: 999,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 4,
            height: 44
          },
          isOpen && { backgroundColor: "#e5e5e5" },
        ]}
        ref={pickerRef}
        onPress={toggleDropDown}
      >
        <Image
          source={images.logo}
          style={{ width: 24, marginLeft: 4 }}
          resizeMode="contain"
        />
        <ThemedText style={{ fontFamily: fonts.interSemibold }}>
          {selectedValue}
        </ThemedText>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(false);
            }}
          >
            <View
              style={{
                position: "absolute",
                width: width,
                height: height,
                backgroundColor: "transparent",
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              top: dropDownPosition.top + 8,
              left: dropDownPosition.left,
              position: "absolute",
              width: "80%",
            }}
          >
            {data.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue(item.value);
                  setIsOpen(false);
                }}
                style={[
                  styles.itemList,
                  index === 0 && {
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                  },
                  index + 1 === data.length && {
                    borderBottomRightRadius: 4,
                    borderBottomLeftRadius: 4,
                  },
                ]}
                key={index}
              >
                <ThemedText>{item.value}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  itemList: {
    padding: 8,
    backgroundColor: "white",
  },
});
