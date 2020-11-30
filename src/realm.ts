import {ObjectId} from 'bson';
import Realm from 'realm';
import RealmItem from './models/realm-item';

const TEST_ITEM_AMOUNT = 50000;

export const realm = new Realm({schema: [RealmItem]});

// uncomment to clear realm
// realm.write(() => realm.deleteAll());

// Intended for initial run.
// If no items found, add {TEST_ITEM_AMOUNT} of items w. random data.
if (realm.objects(RealmItem).length < 1) {
  realm.write(() => {
    for (let i = 1; i <= TEST_ITEM_AMOUNT; i++) {
      realm.create(RealmItem, {
        _id: new ObjectId(),
        itemNo: i,
        text: Math.random().toString(36).slice(2),
      });
    }
  });
}
