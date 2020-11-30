import React, {useState} from 'react';
import {Alert, Button, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {realm} from '../realm';
import RealmItem from '../models/realm-item';
import {EditFrame, SubTittle, TextBox} from '../components/styled';
import {NavigationStackParamList} from '../../App';

type NavigationProps = StackScreenProps<NavigationStackParamList, 'EditItem'>;

type Props = NavigationProps & {};

const ItemScreen: React.FC<Props> = ({route, navigation}) => {
  const {item} = route.params;

  const [text, setText] = useState(item.text);
  const [itemNo, setItemNo] = useState(item.itemNo);
  const setItemNoText = (input: string) => {
    const no = Number.parseInt(input, 10);
    if (!Number.isNaN(no)) {
      setItemNo(no);
    }
  };

  const saveItem = () => {
    const entity = realm.objectForPrimaryKey(RealmItem, item._id);
    if (entity) {
      realm.write(() => {
        entity.itemNo = itemNo;
        entity.text = text;
      });
      navigation.goBack();
    }
  };

  const deleteItem = () => {
    Alert.alert(
      'Please confirm',
      `Are you sure you want to delete item with id:\n"${item._id}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const entity = realm.objectForPrimaryKey(RealmItem, item._id);
            if (entity) {
              realm.write(() => {
                realm.delete(entity);
              });
              navigation.goBack();
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <>
      <EditFrame>
        <SubTittle>Editable data:</SubTittle>
        <TextBox placeholder="Text" onChangeText={setText} value={text} />
        <TextBox
          placeholder="Item No."
          keyboardType="numeric"
          onChangeText={setItemNoText}
          value={itemNo.toString()}
        />
      </EditFrame>
      <View>
        <Button
          onPress={saveItem}
          title="Save"
          accessibilityLabel="Save changes"
        />
        <Button
          onPress={deleteItem}
          title="Delete"
          color="#ff0000"
          accessibilityLabel="Delete item"
        />
      </View>
    </>
  );
};

export default ItemScreen;
