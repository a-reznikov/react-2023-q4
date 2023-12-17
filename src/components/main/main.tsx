import { useAppSelector } from '../../store/hooks';
import { selectMain } from '../../store/reducers/main-slice';
import { FormInput } from '../../store/types';
import { EmptyProps } from '../types';

const Main: React.FC<EmptyProps> = (): JSX.Element => {
  const users: FormInput[] = useAppSelector(selectMain);

  return (
    <main className="main mt-4 d-flex justify-content-around flex-wrap">
      {users &&
        users.map((user, index) => {
          const {
            name,
            age,
            email,
            password,
            gender,
            accept,
            picture,
            country,
          } = user;

          return (
            <div
              key={index}
              className={`card text-white mb-3 ${
                index === users.length - 1 ? 'bg-primary' : 'bg-secondary'
              }`}
              style={{ maxWidth: '20rem' }}
            >
              <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                    Age:
                    <span className="badge bg-primary rounded-pill">{`${age}`}</span>
                  </li>
                  <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                    Gender:
                    <span className="badge bg-primary rounded-pill">{`${gender}`}</span>
                  </li>
                  <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                    Country:
                    <span className="badge bg-primary rounded-pill">{`${country}`}</span>
                  </li>
                  <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                    email:
                    <span className="badge bg-primary rounded-pill">{`${email}`}</span>
                  </li>
                  <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                    Password:
                    <span className="badge bg-primary rounded-pill">{`${password}`}</span>
                  </li>
                  <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                    Viruses:
                    <span className="badge bg-primary rounded-pill">{`${accept}`}</span>
                  </li>
                </ul>
              </div>
              <img className="card-header" src={`${picture}`} />
            </div>
          );
        })}
    </main>
  );
};

export default Main;
