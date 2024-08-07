import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LastSevenDayBills () {
    return (
        <View style={styles.container}>
            <View style={styles.firstLine}>
                <Text style={{color:'white', fontSize:16, fontWeight:'600'}}>Last 7 Days Bills</Text>
                <TouchableWithoutFeedback><View style={{flex:1,flexDirection:'row', justifyContent:'flex-end'}}>
                    <Text style={{color:'gray'}}>All Bills </Text> 
                    <Ionicons name="chevron-forward-outline"  size={16} color={'gray'}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#0e0e0e',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        margin:10
    },
    firstLine:{
        flex:1,
        flexDirection:'row',
        fontSize: 20,
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
    },
    expense: {
        fontSize: 40,
        marginBottom: 20,
      },
    details: {
        flexDirection: 'row',
        alignItems:'flex-end',
        marginBottom:10
      },
})

