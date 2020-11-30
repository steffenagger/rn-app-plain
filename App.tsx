import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListScreen from './src/screens/item-list';
import CreateItemScreen from './src/screens/create-item';
import EditItemScreen from './src/screens/edit-item';
import {Button} from 'react-native';
import RealmItem from './src/models/realm-item';

export type NavigationStackParamList = {
  List: undefined;
  CreateItem: undefined;
  EditItem: {item: RealmItem};
};

const Stack = createStackNavigator<NavigationStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.push('CreateItem')}
                title="Add"
              />
            ),
          })}
        />
        <Stack.Screen name="CreateItem" component={CreateItemScreen} />
        <Stack.Screen
          name="EditItem"
          component={EditItemScreen}
          options={({route}) => ({title: route.params.item._id.toHexString()})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
