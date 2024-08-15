
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
    petrol:Petrol

  };

  const iconLib:{[key:string]:{[key:string]:string[]}} = {
    expense:{
      groceries:[],
      dinning:["breakfast","lunch","dinner","drink"],
      snacks:[],
      transport:["petrol","car"],
      shopping:["camera"]
    }
  }

  export function Icon({ name }: { name: string }) {
    // 根据 `name` 动态选择组件
    const SvgComponent = iconMap[name];
  
    // 如果找不到对应的组件，返回 null 或者一个默认的组件
    if (!SvgComponent) {
      return null;
    }
  
    // 渲染选择的组件
    return <SvgComponent width={24} height={24} />;
  }