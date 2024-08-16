import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Fob ({toggleModal}:{toggleModal:()=>void}) {
    
   
    return(
        <TouchableOpacity style={styles.fab} activeOpacity={1} onPress={toggleModal}>
            <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}
export function CreateBill ({modalVisible,toggleModal}:{modalVisible:boolean,toggleModal:()=>void}) {
    const slideUp = new Animated.Value(300); // 初始位置在屏幕外
    return(
        <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideUp }] }]}>
            <Text style={styles.modalText}>This is the popup content!</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
    
    
    modalText: {
      fontSize: 18,
      color: 'black', // 将字体颜色设置为黑色以与白色背景对比
    backgroundColor: 'red', // 测试背景色，查看文本是否被渲染

    },

    closeButtonText: {
      fontSize: 16,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 300,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeButton: {
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
      },
  });