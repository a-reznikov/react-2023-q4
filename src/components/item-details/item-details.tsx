import { NextRouter, useRouter } from 'next/router';
import { useAppDispatch } from '../../store/hooks';

import Loader from '../loader';
import { Character } from '../types';

import styles from './item-details.module.css';
import { Details } from '../../store/reducers/details-slice';

const ItemDetails: React.FC<{ dataDetails: Character[] }> = ({
  dataDetails,
}): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const router: NextRouter = useRouter();

  const loadingDetails: boolean = false;

  function onCloseDetails(): void {
    dispatch(Details.id.set(''));
    const params = new URLSearchParams(`${router.asPath}`.slice(1));
    params.delete('id');

    router.push(`?${params.toString()}`);
  }

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
      <section className={styles.sectionRight} data-testid="section-right">
        <div
          className={`${styles.detailsCard} card d-flex flex-row mb-3`}
          key={_id}
          data-testid="item-details"
        >
          <button
            type="button"
            data-testid="btn-close"
            className={`${styles.btnClose} btn-close`}
            onClick={onCloseDetails}
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
    <section className={styles.sectionRight} data-testid="section-right">
      <Loader />
    </section>
  ) : (
    item
  );

  return content;
};

export default ItemDetails;
