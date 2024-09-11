import  NumericPad  from  'react-native-numeric-pad'
import { useRef,useContext } from 'react'
import { View,TextInput,StyleSheet,Text,TouchableOpacity,Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FormattedAmount } from '@/app/data/format'
import { GlobalStateContext } from '@/app/(tabs)/_layout'

const { width, height } = Dimensions.get('window');


export function Numpad ({setAmount,amount}:{setAmount:any, amount:string}) {
    const numpadRef = useRef(null)
    const { currency, setCurrency } = useContext(GlobalStateContext);

    return(
        <>
            <View style={styles.inputContiner}>
                {/*<TextInput
                style={styles.amountTxt}
                showSoftInputOnFocus={false}
                maxLength={8}
                autoFocus={true}
                editable={false}
                selectTextOnFocus={false}
                value={amount}
                />*/}
                <View>
                    <FormattedAmount amount={Number(amount)} currency={currency} style={styles.amountTxt}/>
                </View>
                
            </View>
            <View style={styles.padContainer}>
                <View style={styles.numPadContainer}>
                    <NumericPad ref={numpadRef} numLength={8} 
                        allowDecimal={true}
                        onValueChange={value => setAmount(value)}
                        buttonAreaStyle={{ backgroundColor: 'rgb(15,15,15)' }}
                        buttonTextStyle={styles.buttonText}
                        buttonItemStyle={{backgroundColor:'black',borderRadius:5,width:'95%',opacity:1}}
                        rightBottomButton={<Text style={styles.buttonText}>AC</Text>}
                        buttonSize={60}
                        activeOpacity={0.1}
    
                        onRightBottomButtonPress={() => {numpadRef.current.clearAll()}}      
                    />
                </View>
                <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.clearButton} onPress={()=>{numpadRef.current.clear()}}><Ionicons name={'backspace-outline'} size={28} color={'white'} /></TouchableOpacity>
                    
                    <TouchableOpacity style={styles.saveButton}><Text style={styles.saveTxt}>Save</Text></TouchableOpacity>
                </View>
            </View> 
        </>
        
    )
}

const styles = StyleSheet.create({
    amountTxt:{
        fontSize: 30,
    lineHeight: 40,
    marginTop: 20,
    color: 'orange',
    fontWeight:'600'
    },
    inputContiner:{
        alignItems:'flex-end',
        marginHorizontal:10
    },
    saveTxt:{
        color:'white',
        fontSize:20,
        margin:0,
        justifyContent:'center',
        fontWeight:'700'
    },
    padContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:2
    },
    numPadContainer:{
        flex:6,

    },
    saveButtonContainer:{
        flex:2,
        paddingVertical:8,
        flexDirection:'column'
        
    },
    saveButton:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'orange',
        borderRadius:5,

    },
    buttonText:{
        color:'white',
        fontSize:24,
       
    },
    clearButton:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        marginBottom:12,
        height:60,
        backgroundColor:'rgb(8,8,8)',
        opacity:1,
        borderRadius:5
    }
})
