import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/Button'
import { useDbOperations } from '@/database/dbOperations'
import { useRefresh } from '@/context/RefreshContext'

const Config = () => {
    const dbOperations = useDbOperations(); 
    const { triggerRefresh } = useRefresh()
    
    const deleteDb = async () => {
      try {
       await dbOperations.dropDatabase()
      } catch (error) {
        console.error('Erro ao dropar banco de dados', error);
      } finally {
        triggerRefresh();
      }
    }

  return (
    <SafeAreaView>
      <Button handlePress={deleteDb} title='Deletar banco de dados'/>
    </SafeAreaView>
  )
}

export default Config