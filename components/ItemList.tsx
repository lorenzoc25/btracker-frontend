import React from 'react';
import Item from './Item';
import { Package } from '../types/package';

interface ItemListProp {
  items : Package[];
}

const ItemList = ({ items } : ItemListProp) => (
  <>
    {
      items.map(
        (item) => <Item key={item.tracking} item={item} />,
      )
    }
  </>
);

export default ItemList;
