import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Fob () {
    const [modalVisible, setModalVisible] = useState(false);
  const slideUp = new Animated.Value(300); // 初始位置在屏幕外

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        if (!modalVisible) {
          Animated.spring(slideUp, {
            toValue: 0, // 移动到屏幕内
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(slideUp, {
            toValue: 300, // 移动到屏幕外
            useNativeDriver: true,
          }).start(() => setModalVisible(false));
        }
      };
    return(
        
        <TouchableOpacity style={styles.fab} activeOpacity={1} onPress={toggleModal}>
            <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: 'rgba(230, 145, 56,1)',
      borderRadius: 50,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      zIndex: 9999,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '100%',
      height: 300,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: 'yellow',
      padding: 10,
      borderRadius: 10,
    },
    closeButtonText: {
      fontSize: 16,
    },
  });