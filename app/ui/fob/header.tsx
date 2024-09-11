import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState,useRef } from 'react';

export function Header ({toggleModal,activeTab,setActiveTab}:{toggleModal:()=>void, activeTab:any, setActiveTab:any}) {
    const translateX = useRef(new Animated.Value(0)).current;
    const [tabContainerWidth, setTabContainerWidth] = useState(0); // 保存Tab容器的宽度
    const tabWidth = tabContainerWidth / 3; // 假设有3个Tab

  const handleTabPress = (tab:string) => {
    if(tab==='Income') setActiveTab('income')
    else if(tab==='Expense') setActiveTab('cost')
    else if(tab==='Transfer') setActiveTab('transfer')
    

    // 计算目标位置
    let toValue = 0;
    if (tab === 'Income') toValue = tabWidth-3;
    else if (tab === 'Transfer') toValue = 2 * tabWidth-5;

    // 启动动画
    Animated.timing(translateX, {
      toValue,
      duration: 300, // 动画持续时间
      useNativeDriver: true,
    }).start();
  };

  return (   
              <>
                  <TouchableOpacity onPress={toggleModal}>
                      <AntDesign name="left" size={24} color="white" />
                  </TouchableOpacity>
                <View 
                    style={styles.tabContainer}
                    onLayout={(event) => {
                        const { width } = event.nativeEvent.layout;
                        setTabContainerWidth(width); // 保存Tab容器的宽度
                      }}>
                <Animated.View
                                style={[
                        styles.animatedBackground,
                        { transform: [{ translateX }], width: tabWidth }
                    ]}
                    />
                    <TouchableOpacity onPress={() => handleTabPress('Expense')}>
                        <Text style={[styles.tabText, activeTab === 'Expense' && styles.activeTabText]}>Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTabPress('Income')}>
                        <Text style={[styles.tabText, activeTab === 'Income' && styles.activeTabText]}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTabPress('Transfer')}>
                        <Text style={[styles.tabText, activeTab === 'Transfer' && styles.activeTabText]}>Transfer</Text>
                    </TouchableOpacity>
                </View>
                  <TouchableOpacity>
                      <AntDesign name="setting" size={24} color="white" />
                  </TouchableOpacity>
              </>
  )
}


const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 0,
        backgroundColor: 'black',
        alignItems: 'center',
        marginTop:60
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor:'#424949',
        padding:1,
        borderRadius:10,
        alignItems:'center'
    },
    tabText: {
        color: '#b3b6b7',
        marginHorizontal: 6,
        fontSize: 12,
        paddingVertical:10,
      paddingHorizontal:2,
    },
   
    activeTabText: {
      color: 'white',
      borderRadius:10,
      overflow: 'hidden',
    },
    animatedBackground: {
      position: 'absolute',
      height: '90%',
      backgroundColor: 'black',
      borderRadius: 8,
      marginHorizontal:2,
    }, 
  });