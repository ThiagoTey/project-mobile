import { View, Text, FlatList, SafeAreaView } from 'react-native'

import { useEffect, useState } from 'react';

import { Unitsinterface } from '@/types';
import UnitComponent from '@/components/products/UnitComponent';
import { useUnitDatabase } from '@/database/useUnitDatabase';

const Units = () => {
  const useUnitDb = useUnitDatabase()
  const [units, setUnits] = useState<Unitsinterface[]>([]);

  useEffect(() => {
    const loadunits = async () => {
      const data = await useUnitDb.searchByQuery()
      setUnits(data)
    }
    loadunits();
  },[])

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