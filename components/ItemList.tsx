import React from 'react';
import Item from './Item';
import { Package } from '../types/package';

interface ItemListProp {
  items : Package[];
}

const ItemList = ( { items } : ItemListProp ) =>{
  return (<>
    {
      items.map(
        (item, idx) => <Item key={idx} item={item} />,
      )
    }
  </>);
};

export default ItemList;