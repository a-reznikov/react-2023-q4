import { NextRouter, useRouter } from 'next/router';
import { ItemCardProps } from '../types';

import styles from './item-card.module.css';

const ItemCard: React.FC<ItemCardProps> = (
  props: ItemCardProps
): JSX.Element => {
  const router: NextRouter = useRouter();
  const { id } = router.query;

  const { name, gender, race, birth, _id } = props.character;

  function onPushDetails(id: string) {
    const params = new URLSearchParams(`${router.asPath}`.slice(1));
    if (id) {
      params.set('id', id);
    } else {
      params.delete('id');
    }
    router.push(`?${params.toString()}`);
  }

  function onChangeId(_id: string): void {
    if (_id === id) {
      onPushDetails('');
    } else {
      onPushDetails(_id);
    }
  }

  return (
    <div
      data-testid="item-card"
      className={`${styles.characterCard} card d-flex flex-row mb-3 ${
        id === _id ? 'border-success' : ''
      }`}
      onClick={(): void => onChangeId(_id)}
    >
      <div
        className={`${styles.characterImage} ${styles[race.toLowerCase()]}`}
      />
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
};

export default ItemCard;
