import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = 320;

const Sidebar = ({filterOpen} : {filterOpen:boolean}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const translateX = useSharedValue(width);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const openDrawer = () => {
    translateX.value = withSpring(width - DRAWER_WIDTH);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    translateX.value = withSpring(width);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if(filterOpen){
      openDrawer()
    }else{
      closeDrawer()
    }
    console.log(filterOpen)
  },[filterOpen])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={(event) => {
          if (event.nativeEvent.translationX < -50 && isDrawerOpen) {
            closeDrawer();
          }
        }}>
          {/* Drawer aberto */}
          <Animated.View className='h-screen' style={[styles.drawer, animatedStyles]}>
            <Text>Filtros de Pesquisa</Text>
            {/* <Button title="Fechar" onPress={closeDrawer} /> */}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Sidebar;