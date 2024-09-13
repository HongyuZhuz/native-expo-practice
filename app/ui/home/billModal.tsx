import { BillIncludeAccountName } from "@/assets/definition";
import { Modal,Text,StyleSheet,TouchableOpacity,View } from "react-native"
import { Icon } from "@/assets/icons/icon";

export function BillModal ( {modalVisible, toggleModal,bill}:{modalVisible:boolean,toggleModal:()=>void,bill:BillIncludeAccountName}) {
    console.log("pressed bills")
    return(
        <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={toggleModal} 
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPressOut={toggleModal} // 点击背景关闭弹窗
      >
        <View style={styles.modalContent}>
          <ModalDetail bill={bill}/>
        </View>
      </TouchableOpacity>
    </Modal>
    )
}

function ModalDetail ({bill}:{bill:BillIncludeAccountName}){
    return(
        <View>
            <Icon name = {bill.icon_name?bill.icon_name:"undefined"}/>
            <Text style={styles.text}>{bill.category_name}</Text>
            <Text style={styles.text}>{bill.amount}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      modalContent: {
        width: '100%', // 根据需要调整宽度
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom:20
        // 添加其他需要的样式
      },
      text: {
        // 文本样式
        fontSize: 16,
        color: '#333',
      },
  });