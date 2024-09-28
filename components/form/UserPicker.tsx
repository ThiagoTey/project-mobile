import { View, StyleSheet, Modal, Dimensions, Image, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import ThemedText from "../typography/ThemedText";
import { colors, fonts, images } from "@/constants";
import { useAuth } from "@/context/AuthContext";

type Props = {};

const { width, height } = Dimensions.get("window");

const UserPicker = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const pickerRef = useRef<TouchableOpacity | null>(null);
  const users = [{ name: "Admin" }, { name: "Trocar Usuário" }];
  const [selectedValue, setSelectedValue] = useState(users[0].name);

  const firstTwoLetters = selectedValue.substring(0, 2);

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
          setDropDownPosition({ top: py + height, left: px, width: width });
        }
      );
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.PictureContainer,
          isOpen && { backgroundColor: colors.neutral },
        ]}
        ref={pickerRef}
        onPress={toggleDropDown}
      >
        {/* Foto perfil usuário */}
        <View style={styles.profilePicture}>
          <ThemedText style={{ fontFamily: fonts.interMedium }}>
            {firstTwoLetters}
          </ThemedText>
        </View>

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
              top: dropDownPosition.top + 2,
              left: dropDownPosition.left,
              position: "absolute",
              width: dropDownPosition.width,
            }}
          >
                <Pressable
                  onPress={() => {
                    setIsOpen(false);
                  }}
                  style={[
                    styles.itemList
                  ]}
                >
                  <ThemedText>Trocar Usuário</ThemedText>
                </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserPicker;

const styles = StyleSheet.create({
  profilePicture: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    width: 24,
    height: 24,
    backgroundColor: colors.neutral,
    marginLeft: 4,
  },
  PictureContainer: {
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    height: 44,
  },
  itemList: {
    padding: 8,
    backgroundColor: "white",
    borderColor: "#e5e5e5",
    borderWidth:1,
    borderRadius: 16
  },
});
