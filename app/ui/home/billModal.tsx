import { BillIncludeAccountName } from "@/assets/definition";
import { Modal,Text,StyleSheet,TouchableOpacity,View } from "react-native"

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
          <Text style={styles.text}>{bill.account_name+bill.category_name+bill.created_at+bill.amount}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      modalContent: {
        width: '80%', // 根据需要调整宽度
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