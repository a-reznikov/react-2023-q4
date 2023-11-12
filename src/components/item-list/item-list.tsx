import { MouseEvent, useContext, useRef } from 'react';
import { AppContext, Character, EmptyProps } from '../types';

import './item-list.css';
import Loader from '../loader';
import ItemDetails from '../item-details';
import { Context } from '../contexts';
import ItemCard from '../item-card';

const ItemList: React.FC<EmptyProps> = (): JSX.Element => {
  const context: AppContext = useContext<AppContext>(Context);
  const { data, loading, setId } = context;
  const leftList: React.MutableRefObject<null> = useRef(null);

  const onCloseDetails = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    if (leftList.current === event.target) setId('');
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
    <div className="item-list">
      <div className="section-left" onClick={onCloseDetails} ref={leftList}>
        {items}
      </div>
      <ItemDetails />
      {message}
    </div>
  );
};

export default ItemList;
