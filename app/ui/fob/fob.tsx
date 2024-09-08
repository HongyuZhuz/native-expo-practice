import { StyleSheet,TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { CreateBill } from './createBill';


export default function Fob () {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

    return(
        <TouchableOpacity style={styles.fab} activeOpacity={1} onPress={toggleModal}>
            <AntDesign name="plus" size={24} color="white" />
            <CreateBill modalVisible={modalVisible} toggleModal={toggleModal}/>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'rgba(230, 145, 56,1)',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 9999,
  },
});