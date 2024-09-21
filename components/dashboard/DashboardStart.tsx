import { Button, Modal, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ThemedText from "@/components/typography/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";

const DashboardStart = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showPicker, setShowPicker] = useState(false);

  const months = Array.from({ length: 12 }, (v, i) => i + 1); // Mês 1 a 12
  const years = Array.from({ length: 25 }, (v, i) => i + 2010); // Gerar anos
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <View className="pt-4">
      <View className="flex-row justify-center items-center gap-1">
        {/* <ThemedText className='text-gray-500'>Agosto 2024</ThemedText> */}
        <ThemedText className="text-gray-500">{`${meses[month]}/${year}`}</ThemedText>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <AntDesign name="caretdown" size={12} color="#6b7280" />
        </TouchableOpacity>
      </View>
      <ThemedText className="font-ibold text-[40px]">R$1,812.15</ThemedText>
      <Modal visible={showPicker} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={{ backgroundColor: "white", minWidth: 300, padding: 20 }}>
            <View >
              <View>
                <ThemedText>Selecionar Mês</ThemedText>
                <Picker
                  selectedValue={meses[month]}
                  onValueChange={(_, index) => setMonth(index)}
                  className="w-80"
                  
                >
                  {meses.map((m, index) => (
                    <Picker.Item key={index} label={m.toString()} value={m} />
                  ))}
                </Picker>
              </View>
              <View>
                <ThemedText>Selecionar Ano</ThemedText>
                <Picker
                  selectedValue={year}
                  onValueChange={(itemValue) => setYear(itemValue)}
                >
                  {years.map((y) => (
                    <Picker.Item key={y} label={y.toString()} value={y} />
                  ))}
                </Picker>
              </View>
            </View>
            <Button title="Confirmar" onPress={() => setShowPicker(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DashboardStart;
