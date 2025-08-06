import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  const tabBarOptions = {
    headerShown: true,
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'white',
    tabBarStyle: {
      backgroundColor: '#FF69B4',
      height: 100,
      paddingBottom: 10,
      paddingTop: 10,
      borderTopWidth: 0,
      elevation: 15,
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500' as const,
      marginBottom: 5,
    },
    tabBarItemStyle: {
      padding: 5,
    },
  };

  return (
    <Tabs screenOptions={tabBarOptions}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          headerTitle: 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold' as const,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="cart" 
        options={{
          title: 'Cart',
          headerTitle: 'My Cart',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold' as const,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="setting" 
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold' as const,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold' as const,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f0f0f0',
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}