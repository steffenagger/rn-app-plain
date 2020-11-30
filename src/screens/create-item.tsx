import React, {useState} from 'react';
import {Alert, Button, View} from 'react-native';
import {ObjectId} from 'bson';
import {StackScreenProps} from '@react-navigation/stack';
import {realm} from '../realm';
import RealmItem from '../models/realm-item';
import {EditFrame, SubTittle, TextBox} from '../components/styled';
import {NavigationStackParamList} from '../../App';

type NavigationProps = StackScreenProps<NavigationStackParamList, 'CreateItem'>;

type Props = NavigationProps & {};

const ItemScreen: React.FC<Props> = ({navigation}) => {
  const [text, setText] = useState('');
  const [itemNo, setItemNo] = useState(0);
  const setItemNoText = (input: string) => {
    const no = Number.parseInt(input, 10);
    if (!Number.isNaN(no)) {
      setItemNo(no);
    }
  };

  const createItem = () => {
    try {
      realm.write(() => {
        realm.create(RealmItem, {
          _id: new ObjectId(),
          itemNo,
          text,
        });
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert('An error occurred', err.message || err);
    }
  };

  return (
    <>
      <EditFrame>
        <SubTittle>Additional data:</SubTittle>
        <TextBox onChangeText={setText} value={text} />
        <TextBox
          keyboardType="numeric"
          onChangeText={setItemNoText}
          value={itemNo.toString()}
        />
      </EditFrame>
      <View>
        <Button
          onPress={createItem}
          title="Create"
          accessibilityLabel="Create new item"
        />
        <Button
          onPress={navigation.goBack}
          title="Cancel"
          color="#ff0000"
          accessibilityLabel="Cancel creation"
        />
      </View>
    </>
  );
};

export default ItemScreen;
