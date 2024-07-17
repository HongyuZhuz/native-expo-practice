import {Text, View} from 'react-native'
import { useEffect } from 'react';
import { createTable } from '@/data/database';


export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: 'white' }}>Edit app/index.tsx to edit this screen</Text>
    </View>
  );
}
