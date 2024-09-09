import  NumericPad  from  'react-native-numeric-pad'
import { useRef,useContext } from 'react'
import { View,TextInput,StyleSheet,Text,TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FormattedAmount } from '@/app/data/format'
import { GlobalStateContext } from '@/app/(tabs)/_layout'


export function Numpad ({setAmount,amount}:{setAmount:any, amount:string}) {
    const numpadRef = useRef(null)
    const { currency, setCurrency } = useContext(GlobalStateContext);

    return(
        <View>
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
            <View style={styles.numPadContainer}>
                <NumericPad ref={numpadRef} numLength={8} 
                    allowDecimal={true}
                    onValueChange={value => setAmount(value)}
                    buttonAreaStyle={{ backgroundColor: 'black', paddingRight:60 }}
                    buttonTextStyle={{color:'white'}}
                    rightBottomButton={<Ionicons name={'backspace-outline'} size={28} color={'white'}/>}
                    buttonSize={60}
                    activeOpacity={0.1}
                    onRightBottomButtonPress={() => {numpadRef.current.clear()}}      
                />
                <View style={styles.numPadContainer}>
                <TouchableOpacity><Text style={styles.saveTxt}>Save</Text></TouchableOpacity>
                </View>
                
            </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    amountTxt:{
        fontSize: 30,
    lineHeight: 40,
    marginTop: 20,
    color: 'orange'
    },
    inputContiner:{
        backgroundColor:'black',
        alignItems:'flex-end'
    },
    saveTxt:{
        color:'orange',
        fontSize:100,
        margin:0
    },
    numPadContainer:{
        flexDirection:'column',
        borderColor:'white',
        borderWidth:5
    }
})
