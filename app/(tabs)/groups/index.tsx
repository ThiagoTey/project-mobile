import { getStorageData } from "@/lib/api";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";

// import groupsJson from "../../../mocks/mock-groups.json";

const Groups = () => {

  const [groups, setGnits] = useState([]);

  useEffect(() => {
    const loadunits = async () => {
      const data = await getStorageData('groups')
      setGnits(data)
    }
    loadunits();
  },[])

  return (
    <SafeAreaView>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View className="border-b-2 border-gray-200 items-center flex-row gap-2 px-4 pb-2 my-2">
            <Text className="font-ibold">Descrição</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="border-b-2 border-gray-200 items-center flex-row gap-2 px-4 pb-2 my-2">
            <Text className="font-ilight">{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>Sem produtos disponiveis</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Groups;
