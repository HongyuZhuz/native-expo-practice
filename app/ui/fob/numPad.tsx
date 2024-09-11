import  NumericPad  from  'react-native-numeric-pad'
import { useRef,useContext } from 'react'
import { View,TextInput,StyleSheet,Text,TouchableOpacity,KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback  } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FormattedAmount } from '@/app/data/format'
import { GlobalStateContext } from '@/app/(tabs)/_layout'



export function Numpad ({setAmount,amount,description, setDescription}:{setAmount:any, amount:string,description:string,setDescription:any}) {
    const numpadRef = useRef(null)
    const { currency, setCurrency } = useContext(GlobalStateContext);

    return(
        <>
        <KeyboardAvoidingView
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1}}>
                <View style={styles.inputContiner}>
                    <TextInput autoFocus={false} editable={true} placeholder='Click to input description' style={styles.descripetionInput} selectionColor="orange" 
                    onChangeText={(text:string) => setDescription(text)}/>
                    <FormattedAmount amount={Number(amount)} currency={currency} style={styles.amountTxt}  />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>  

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
    fontWeight:'600',
    marginLeft:10,
    },
    descripetionInput:{
        flex:1,
        color:'white',
        marginBottom:10,
        fontSize:18,
    },
    inputContiner:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
        marginHorizontal:10,
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
        paddingRight:2,

    },
    numPadContainer:{
        flex:6,

    },
    saveButtonContainer:{
        flex:2,
        paddingVertical:8,
        flexDirection:'column',
        justifyContent:'space-around'
        
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
