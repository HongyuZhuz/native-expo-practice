
import { SvgProps } from 'react-native-svg';
import Shopping from './shopping.svg'
import Sale from './sale.svg'
import Transfer from './transfer.svg'
import Undefined from './undefined.svg'
import Breakfast from './breakfast.svg'
import Lunch from './lunch.svg'
import Dinner from './dinner.svg'
import Drink from './drink.svg'
import Camera from './camera.svg'
import Car from './car.svg'
import Dining from './dining.svg'
import Groceries from './groceries.svg'
import Petrol from './petrol.svg'
import Snacks from './snacks.svg'
import Transport from './transport.svg'
import Feather from '@expo/vector-icons/Feather';
import { View } from 'react-native';




const iconMap: { [key: string]:  React.FC<SvgProps> } = {
    shopping: Shopping,
    sale:Sale,
    transfer:Transfer,
    undefined:Undefined,
    breakfast:Breakfast,
    camera:Camera,
    car:Car,
    dining:Dining,
    dinner:Dinner,
    drink:Drink,
    groceries:Groceries,
    lunch:Lunch,
    petrol:Petrol,
    snacks:Snacks,
    transport:Transport

  };

  export const iconLib:{[key:string]:{[key:string]:string[]}} = {
    expense:{
      groceries:[],
      dining:["breakfast","lunch","dinner","drink"],
      snacks:[],
      transport:["petrol","car"],
      shopping:["camera"]
    }
  }

  export function Icon({ name,style,more }: { name: string, style?:any,more?:boolean }) {
    // 根据 `name` 动态选择组件
    const SvgComponent = iconMap[name];
  
    // 如果找不到对应的组件，返回 null 或者一个默认的组件
    if (!SvgComponent) {
      return null;
    }
  
    // 渲染选择的组件
    return <View><SvgComponent width={style?style.width:24} height={style?style.height:24} ></SvgComponent>
    {more===true?<View
          style={{
            position: 'absolute',
            right: -6,
            bottom: -7,
            backgroundColor: 'gray',
            padding: 1,  
            borderRadius: 20, 
          }}
        >
          <Feather name="more-horizontal" size={10} color="white" />
        </View>:<></>}</View>;
  }