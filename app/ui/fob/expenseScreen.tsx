import { iconLib,Icon } from '@/assets/icons/icon';
import { Pressable,Dimensions } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { useState } from 'react';

export function ExpenseScreen({category,setCategory,subCategory,setSubCategory}:{category:string,setCategory:any,subCategory:string|null, setSubCategory:any}) {
  const expenseKeys = Object.keys(iconLib.expense);
  const [expandedIcon, setExpandedIcon] = useState<string | null>(null);  // 用于保存当前展开的图标
  const [iconPosition, setIconPosition] = useState<{ x: number, y: number } | null>(null);  // 保存图标位置
  
  const handleIconPress = (name: string, event: any) => {
    // 获取点击图标的屏幕坐标
    const { pageX, pageY } = event.nativeEvent;
    if (iconLib.expense[name] && iconLib.expense[name].length > 0) {
      setExpandedIcon(name);
      setCategory(name);
      
      setIconPosition({ x: pageX, y: pageY });  // 设置图标的坐标位置
    } else {
      setCategory(name);
      setExpandedIcon(null);
    }
    setSubCategory(null)
  };

  const handleSubIconPress = (subIcon:string) =>{
    setSubCategory(subIcon)
    console.log(subIcon)
    closeOverlay()
  }

  const closeOverlay = () => {
    setExpandedIcon(null);  // 关闭弹出窗口
  };
    return (
      <View style={styles.screenContainer}>
      <View style={styles.iconContainer}>
        {expenseKeys.map((name) => {
          const isActiveCategory = category === name;
          const iconName = isActiveCategory && subCategory && iconLib.expense[name].includes(subCategory)? subCategory : name; // 根据 subCategory 和 category 显示不同的图标
          const displayText = isActiveCategory && subCategory && iconLib.expense[name].includes(subCategory)? `${name}.${subCategory}` : name; // 显示名称

              return (
                <View key={name} style={styles.iconGroup}>
                  <TouchableOpacity onPress={(event) => handleIconPress(name, event)} style={styles.iconGroup}>
                    <View style={[styles.iconWrapper, isActiveCategory && styles.activeIcon]}>
                      <Icon name={iconName} style={styles.icon} more={iconLib.expense[name]?.length > 0} />
                    </View>
                    <Text style={[styles.categoryText, isActiveCategory && styles.activeText]}>
                      {displayText}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
      </View>
        {/* 显示浮动窗口 */}
      {expandedIcon && iconPosition && (
        <>
          {/* 背景灰色遮罩 */}
          <Pressable style={styles.overlay} onPress={closeOverlay} />

          {/* 悬浮窗口，居中显示 */}
          <View style={[styles.floatingMenu, 
            {
              // 确保浮动窗口不会超出屏幕边界
              top: Math.min(Math.max(iconPosition.y - 50, 0), screenHeight - 150),  // 150 是预估的窗口高度
              left: Math.min(Math.max(iconPosition.x - 50, 0), screenWidth - 150),  // 150 是预估的窗口宽度
            }
          ]}>
            <View style={styles.subIconContainer}>
              {iconLib.expense[expandedIcon].map((subIcon: string) => (
                <TouchableOpacity key={subIcon} style={styles.subIconWrapper} onPress = {()=>handleSubIconPress(subIcon)}>
                  <Icon name={subIcon} style={styles.subIcon} more={false} />
                  <Text style={styles.subIconText}>{subIcon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    categoryText: {
        color: 'white',
        marginTop: 5,
        fontSize:12,
        textAlign:'center'
    },
    screenContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    iconContainer:{
      flex:1,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:20,
      marginHorizontal:20
    },
    iconGroup:{
      alignSelf: 'flex-start', 
      width:70,
      alignItems:'center',
    },
    icon:{
      width:30,
      height:30
    },
    activeIcon:{
      backgroundColor:'rgba(255,165,0,0.5)',
      borderRadius:50,
    },
    iconWrapper:{
      padding:3
    },
    activeText:{
      color:'orange'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',  // 半透明灰色背景
    },
    floatingMenu: {
      position: 'absolute',
      
      backgroundColor: 'rgb(10,10,10)',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    subIconContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    subIconWrapper: {
      margin: 10,
      alignItems: 'center',
    },
    subIcon: {
      width: 35,
      height: 35,
    },
    subIconText: {
      color: 'white',
      fontSize: 12,
      marginTop: 5,
    },
     
  });