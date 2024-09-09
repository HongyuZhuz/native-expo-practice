import { Tabs } from 'expo-router';
import React from 'react';
import { useState,useContext,createContext } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface GlobalContextType {
  currency:string;
  setCurrency:(value:string)=>void
}
const defaultValue = {
  currency:'AUD',
  setCurrency:()=>{}
}
export const GlobalStateContext = createContext<GlobalContextType>(defaultValue);

const GlobalStateProvider = ({children}:{children:any})=>{
  const [currency, setCurrency] = useState('AUD');

  return(
    <GlobalStateContext.Provider value={{currency, setCurrency }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export default function TabLayout() {

  return (
    <GlobalStateProvider>
      <NavTabs/>
    </GlobalStateProvider>
    
  );
}



function NavTabs () {
  const colorScheme = useColorScheme();
return(
  <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar/index"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assets/index"
        options={{
          title: 'Assets',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} />
          ),
        }}/>
        <Tabs.Screen
        name="reports/index"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'analytics' : 'analytics-outline'} color={color} />
          ),
        }}/>
        <Tabs.Screen
        name="mine/index"
        options={{
          title: 'Mine',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}/>
    </Tabs>
)
}
