import React from 'react';
import {FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {realm} from '../realm';
import RealmItem from '../models/realm-item';
import {ListItem} from '../components/list-item';
import {SafeContainer} from '../components/styled';
import {NavigationStackParamList} from '../../App';

type NavigationProps = StackScreenProps<NavigationStackParamList, 'List'>;
type Props = NavigationProps;

type State = {
  items: Array<RealmItem>;
};

export default class ListScreen extends React.PureComponent<Props, State> {
  #collection: Realm.Collection<RealmItem>;

  constructor(props: Props) {
    super(props);

    this.#collection = realm.objects(RealmItem).sorted('text');

    this.state = {
      items: [...this.#collection],
    };
    this.#collection.addListener(this.onCollectionChange);
  }

  componentWillUnmount() {
    this.#collection.removeListener(this.onCollectionChange);
  }

  private onCollectionChange = (
    collection: Realm.Collection<RealmItem>,
    changes: Realm.CollectionChangeSet,
  ) => {
    try {
      if (
        !changes.insertions.length &&
        !changes.deletions.length &&
        !changes.newModifications.length
      ) {
        return;
      }

      // If simply running this.setState({items: [...collection]}), ALL items re-renders
      // (FlatList will fix some performance issues, as it limits the amount of renders to the viewable area)

      // So we need to do this:
      const items = [...this.state.items];

      for (let i = changes.deletions.length - 1; i >= 0; i--) {
        const index = changes.deletions[i];
        items.splice(index, 1);
      }

      for (let i = changes.insertions.length - 1; i >= 0; i--) {
        const index = changes.insertions[i];
        items.splice(index, 0, collection[index]);
      }

      for (let i = changes.newModifications.length - 1; i >= 0; i--) {
        const index = changes.newModifications[i];
        items[index] = collection[index];
      }

      this.setState({items});
    } catch (err) {
      console.error(err);
    }
  };

  private keyExtractor = (item: RealmItem) =>
    `realm-item-${item._id.toHexString()}`;

  private renderItem = ({item}: {item: RealmItem}) => (
    <ListItem item={item} navigation={this.props.navigation} />
  );

  render() {
    return (
      <SafeContainer>
        <FlatList
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </SafeContainer>
    );
  }
}
