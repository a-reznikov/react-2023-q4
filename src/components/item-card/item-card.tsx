import { ItemCardProps } from '../types';

import './item-card.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Details } from '../../store/reducers/details-slice';

const ItemCard: React.FC<ItemCardProps> = (
  props: ItemCardProps
): JSX.Element => {
  const id: string = useAppSelector(Details.id.select);
  const dispatch = useAppDispatch();

  const { name, gender, race, birth, _id } = props.character;

  function onChangeId(_id: string): void {
    if (_id === id) {
      dispatch(Details.id.set(''));
    } else {
      dispatch(Details.id.set(_id));
    }
  }

  return (
    <div
      data-testid="item-card"
      className={`character-card card d-flex flex-row mb-3 ${
        id === _id ? 'border-success' : ''
      }`}
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
};

export default ItemCard;
