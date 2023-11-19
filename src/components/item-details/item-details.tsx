import Loader from '../loader';
import { Character, EmptyProps } from '../types';

import './item-details.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SetDetailsId, Details } from '../../store/reducers/details-slice';

const ItemDetails: React.FC<EmptyProps> = (): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const loadingDetails: boolean = useAppSelector(Details.loader.select);
  const dataDetails: Character[] = useAppSelector(Details.data.select);

  function renderItem(): JSX.Element {
    const {
      _id,
      birth,
      death,
      gender,
      hair,
      height,
      name,
      race,
      realm,
      spouse,
      wikiUrl,
    } = dataDetails[0];
    return (
      <section className="section-right" data-testid="section-right">
        <div
          className="details-card card d-flex flex-row mb-3"
          key={_id}
          data-testid="item-details"
        >
          <button
            type="button"
            data-testid="btn-close"
            className="btn-close"
            onClick={(): SetDetailsId => dispatch(Details.id.set(''))}
          ></button>
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
              <li className="list-group-item">
                <span>{`Death: ${death}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Hair: ${hair}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Height: ${height}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Realm: ${realm}`}</span>
              </li>
              <li className="list-group-item">
                <span>{`Spouse: ${spouse}`}</span>
              </li>
              <li className="list-group-item">
                <span>
                  {`Link: ${wikiUrl === 'no info' ? wikiUrl : ''}`}
                  <a href={`${wikiUrl}`} target="_blank" rel="noreferrer">
                    {wikiUrl !== 'no info' ? `More info` : ''}
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  const item: JSX.Element | null = dataDetails.length ? renderItem() : null;
  const content: JSX.Element | null = loadingDetails ? (
    <section className="section-right" data-testid="section-right">
      <Loader />
    </section>
  ) : (
    item
  );

  return content;
};

export default ItemDetails;
