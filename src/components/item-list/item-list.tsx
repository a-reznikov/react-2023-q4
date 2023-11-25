import { MouseEvent, useEffect, useRef } from 'react';
import { Character } from '../types';

import styles from './item-list.module.css';
import ItemCard from '../item-card';
import { Details } from '../../store/reducers/details-slice';
import { useAppDispatch } from '../../store/hooks';
import { Data } from '../../store/reducers/data-slice';

export type WithChildrenProps = {
  children: React.ReactNode;
  data: Character[];
};

const ItemList: React.FC<WithChildrenProps> = ({
  children,
  data,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const leftList: React.MutableRefObject<null> = useRef(null);

  useEffect((): void => {
    dispatch(Data.data.set(data));
  }, [dispatch, data]);

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

  // if (loading) return <Loader />;

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
      {children}
      {message}
    </div>
  );
};

export default ItemList;
