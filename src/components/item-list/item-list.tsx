import { NextRouter, useRouter } from 'next/router';
import { MouseEvent, useRef } from 'react';
import { Character } from '../types';

import styles from './item-list.module.css';
import ItemCard from '../item-card';
import Loader from '../loader';

export type WithChildrenProps = {
  children: React.ReactNode;
  loading: boolean;
  data: Character[];
};

const ItemList: React.FC<WithChildrenProps> = ({
  children,
  loading,
  data,
}): JSX.Element => {
  const leftList: React.MutableRefObject<null> = useRef(null);
  const router: NextRouter = useRouter();
  const { id } = router.query;

  const onCloseDetails = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    if (leftList.current === event.target && id) {
      const params = new URLSearchParams(`${router.asPath}`.slice(1));
      params.delete('id');

      router.push(`?${params.toString()}`);
    }
  };

  function renderItems(): JSX.Element[] {
    return data.map(
      (character: Character): JSX.Element => (
        <ItemCard character={character} key={character._id} />
      )
    );
  }

  const items: JSX.Element[] = renderItems();
  const message: JSX.Element | null = items.length ? null : (
    <p className="list-message text-warning">
      Oops. There is no such character in our database.
    </p>
  );

  return (
    <div className={styles.itemList}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={styles.sectionLeft}
            onClick={onCloseDetails}
            ref={leftList}
          >
            {items}
            {message}
          </div>
          {children}
        </>
      )}
    </div>
  );
};

export default ItemList;
