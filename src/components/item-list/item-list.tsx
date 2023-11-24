import { MouseEvent, useRef } from 'react';
import { Character, EmptyProps } from '../types';

import styles from './item-list.module.css';
import Loader from '../loader';
import ItemDetails from '../item-details';
import ItemCard from '../item-card';
import { Details } from '../../store/reducers/details-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Data } from '../../store/reducers/data-slice';

const ItemList: React.FC<EmptyProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const data: Character[] = useAppSelector(Data.data.select);
  const loading: boolean = useAppSelector(Data.loader.select);
  const leftList: React.MutableRefObject<null> = useRef(null);

  const onCloseDetails = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    if (leftList.current === event.target) dispatch(Details.id.set(''));
  };

  function renderItems(): JSX.Element[] {
    return data.map(
      (character: Character): JSX.Element => (
        <ItemCard character={character} key={character._id} />
      )
    );
  }

  if (loading) return <Loader />;

  const items: JSX.Element[] = renderItems();
  const message: JSX.Element | null = items.length ? null : (
    <p className="list-message text-warning">
      Oops. There is no such character in our database.
    </p>
  );

  return (
    <div className={styles.itemList}>
      <div className="section-left" onClick={onCloseDetails} ref={leftList}>
        {items}
      </div>
      <ItemDetails />
      {message}
    </div>
  );
};

export default ItemList;
