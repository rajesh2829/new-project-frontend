import React, { useEffect, useState } from 'react'
import MultiSelect from '../../../components/MultiselectCreatable';
import ArrayList from '../../../lib/ArrayList';
import { getStoresList } from '../../../services/StoreListService';

const StoreSelector = (props) => {

  useEffect(() => {
    storesList();
  }, []);

  const [stores, setStores] = useState([]);

  const storesList = async () => {
    try {
      let storeLists = [];
      const stores = await getStoresList();
      if (ArrayList.isNotEmpty(stores)) {
        stores.forEach((store) => {
          storeLists.push({
            id: store.id,
            label: store.label,
            value: store.label,
          });
        });
      }
      setStores(storeLists);
      props.setStoreList && props.setStoreList(storeLists)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <MultiSelect
      name={props.name ? props.name : "location"}
      label={props.label ? props.label : "Location"}
      options={stores}
    />
  )
};

export default StoreSelector;