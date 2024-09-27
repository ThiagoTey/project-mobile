import { View, StyleSheet, Modal, Dimensions, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import ThemedText from "../typography/ThemedText";
import { colors, fonts, images } from "@/constants";
import { useAuth } from "@/context/AuthContext";

type Props = {};

const { width, height } = Dimensions.get("window");

const CompanyPicker = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const pickerRef = useRef<TouchableOpacity | null>(null);
  const { allCompanies, userCompany } = useAuth();
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (allCompanies && userCompany) {
      const companyName = allCompanies.find(
        (company) => company.id === Number(userCompany)
      )?.name;
      if (companyName) {
        setSelectedValue(companyName);
      }
    }
  }, [userCompany]);

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
        style={[styles.logoContainer, isOpen && { backgroundColor: "#e5e5e5" }]}
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
              top: dropDownPosition.top + 2,
              left: dropDownPosition.left,
              position: "absolute",
              width: dropDownPosition.width,
            }}
          >
            {allCompanies &&
              allCompanies.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedValue(item.name);
                    setIsOpen(false);
                  }}
                  style={[
                    styles.itemList,
                    index === 0 && {
                      borderTopRightRadius: 99,
                      borderTopLeftRadius: 99,
                    },
                    index + 1 === allCompanies.length && {
                      borderBottomRightRadius: 99,
                      borderBottomLeftRadius: 99,
                    },
                  ]}
                  key={index}
                >
                  <ThemedText>{item.name}</ThemedText>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CompanyPicker;

const styles = StyleSheet.create({
  logoContainer: {
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    height: 44,
  },
  itemList: {
    padding: 8,
    backgroundColor: "white",
    borderColor: colors.neutral,
    borderWidth: 1,
  },
});
