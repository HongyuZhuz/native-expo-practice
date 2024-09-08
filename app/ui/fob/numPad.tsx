import  NumericPad  from  'react-native-numeric-pad'
import { useRef } from 'react'


export function Numpad () {
    const numpadRef = useRef(null)

    return(
        <NumericPad ref={useRef(null)} numLength={8} 
        allowDecimal={true}

        buttonAreaStyle={{ backgroundColor: 'black', marginRight:60 }}
        buttonTextStyle={{color:'white'}}
        
        buttonSize={60}
        activeOpacity={0.1}
        />
    )
}

