import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import RealmItem from '../models/realm-item';
import {PressableFrame, Text, Tittle} from './styled';
import {NavigationStackParamList} from '../../App';

type ListNavigationProp = StackNavigationProp<NavigationStackParamList, 'List'>;
type Props = {
  item: RealmItem;
  navigation: ListNavigationProp;
};

// Example 1 w. PureComponent (class component)

// export class ListItem extends React.PureComponent<Props> {
//   navigateToItem = () => {
//     const {navigation, item} = this.props;

//     navigation.push('EditItem', {item});
//   };
//   render() {
//     const {item} = this.props;
//     console.log('Rendering item', item.text);
//     return (
//       <PressableFrame onPress={this.navigateToItem}>
//         <Tittle>{item._id.toHexString()}</Tittle>
//         <Text>{item.text ?? '-'}</Text>
//       </PressableFrame>
//     );
//   }
// }

// Example 2 w. React.memo (HOC for function component)

const ListItemFC: React.FC<Props> = ({item, navigation}) => {
  console.log('Rendering item', item.text);
  return (
    <PressableFrame onPress={() => navigation.push('EditItem', {item})}>
      <Tittle>{item._id.toHexString()}</Tittle>
      <Text>{item.text ?? '-'}</Text>
    </PressableFrame>
  );
};

export const ListItem = React.memo(ListItemFC);
