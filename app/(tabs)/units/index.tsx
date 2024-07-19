import { View, Text, FlatList, SafeAreaView } from 'react-native'

import units from "../../../mocks/mock-units.json";
import UnitComponent from '@/components/UnitComponent';

const Units = () => {
  return (
    <SafeAreaView>
    <FlatList
      data={units}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UnitComponent
          description={item.description}
          id={item.id}
          weigh={item.weigh}
          abbreviation={item.abbreviation}
        />
      )}
      ListEmptyComponent={() => (
        <View>
          <Text>Sem produtos disponiveis</Text>
        </View>
      )}
    />
  </SafeAreaView>
  )
}

export default Units