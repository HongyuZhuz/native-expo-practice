import  NumericPad  from  'react-native-numeric-pad'
import { useRef } from 'react'
import { View,TextInput,StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export function Numpad ({setAmount,amount}:{setAmount:any, amount:string}) {
    const numpadRef = useRef(null)

    return(
        <View>
            <View style={styles.inputContiner}>
                <TextInput
                style={styles.amountTxt}
                showSoftInputOnFocus={false}
                maxLength={8}
                autoFocus={true}
                editable={false}
                selectTextOnFocus={false}
                value={amount}
                />
            </View>
            <NumericPad ref={numpadRef} numLength={8} 
        allowDecimal={true}
        onValueChange={value => setAmount(value)}
        buttonAreaStyle={{ backgroundColor: 'black', marginRight:60 }}
        buttonTextStyle={{color:'white'}}
        rightBottomButton={<Ionicons name={'backspace-outline'} size={28} color={'white'}/>}
        buttonSize={60}
        activeOpacity={0.1}
        onRightBottomButtonPress={() => {numpadRef.current.clear()}}
        
        />
        </View>
        
    )
}

const styles = StyleSheet.create({
    amountTxt:{
        fontSize: 30,
    lineHeight: 40,
    marginTop: 20,
    color: 'white'
    },
    inputContiner:{
        backgroundColor:'black',
        alignItems:'flex-end'
    }
})
