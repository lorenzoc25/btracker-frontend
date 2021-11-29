import React from 'react';
import Item from './Item';
import { Package } from '../types/package';

interface ItemListProp {
  items : Package[];
  isExtended: boolean;
}

const ItemList = ({ items, isExtended } : ItemListProp) => (
  <>
    {
      items.map(
        (item) => <Item key={item.tracking} item={item} isExtended={isExtended} />,
      )
    }
  </>
);

export default ItemList;
