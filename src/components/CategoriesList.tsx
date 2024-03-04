import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useAppSelector} from '@src/redux/hooks';

import Category from './Category';
import {categoriesList} from '@src/utilis/APIs';

export default function CategoriesList(props: any) {

  const {user} = useAppSelector(({USER}) => USER);
  const [selected, setSelected] = useState(new Map());
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    props.refresh ? setSelected(new Map()) : _categoriesList();
  }, [props.refresh]);

  const _categoriesList = async () => {
    const token = user?.api_token;
    try {
      const res = await categoriesList({token});

      if (res && res.status === 'success') {
        setCategories(res.data);
      }
    } catch (error) {}
  };

  const onSelect = (key: string) => {
    setSelected(state => {
      const newSelected = new Map(state);
      if (!state.has(key)) {
        newSelected.clear();
        newSelected.set(key, !newSelected.get(key));
      }
      return newSelected;
    });
  };

  return (
    <FlatList
      data={categories}
      renderItem={({item}: any) => (
        <Category
          item={item}
          onSelect={() => {
            onSelect(item.id.toString());
            props.onTapCat(item.id.toString());
          }}
          selected={!!selected.get(item.id.toString())}
        />
      )}
      contentContainerStyle={{backgroundColor: '#FAFAFA'}}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item: any) => item.id.toString()}
    />
  );
}
