import { StyleSheet, View, Text} from 'react-native';

export function TransferScreen() {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.categoryText}>Transfer</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    categoryText: {
        color: 'white',
        marginTop: 5,
        fontSize:12,
        textAlign:'center'
    },
    screenContainer: {
      flex:0,
      justifyContent: 'center',
      alignItems: 'center',
      height:'40%',
      
    },
  });