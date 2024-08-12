

import Shopping from './shopping.svg'
import { SvgProps } from 'react-native-svg';
import Sale from './sale.svg'

const iconMap: { [key: string]:  React.FC<SvgProps> } = {
    shopping: Shopping,
    sale:Sale,
  };


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