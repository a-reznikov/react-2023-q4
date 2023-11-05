import { MouseEvent, useRef } from 'react';
import { AppContextToProps, Character } from '../types';

import './item-list.css';
import Loader from '../loader';
import ItemDetails from '../item-details';

const ItemList: React.FC<AppContextToProps> = (
  props: AppContextToProps
): JSX.Element => {
  const {
    context: { data, loading, loadingItem, itemData, setId, id },
  } = props;

  const leftList: React.MutableRefObject<null> = useRef(null);

  function onChangeId(_id: string): void {
    if (_id === id) setId('');
    else setId(_id);
  }

  const onCloseDetails = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    if (leftList.current === event.target) setId('');
  };

  function renderItems(): JSX.Element[] {
    return data.map((character: Character): JSX.Element => {
      const { name, gender, race, birth, _id } = character;

      return (
        <div
          className={`character-card card d-flex flex-row mb-3 ${
            id === _id ? 'border-success' : ''
          }`}
          key={_id}
          onClick={(): void => onChangeId(_id)}
        >
          <div className={`character-image ${race.toLowerCase()}`} />
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span>{`Gender: ${gender}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Race: ${race}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Birth: ${birth}`}</span>
              </li>
            </ul>
          </div>
        </div>
      );
    });
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
      <ItemDetails
        loadingItem={loadingItem}
        setId={setId}
        itemData={itemData}
      />
      {message}
    </div>
  );
};

export default ItemList;
