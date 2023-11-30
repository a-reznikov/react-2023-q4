import { Link } from 'react-router-dom';
import { EmptyProps } from '../types';

const Navigation: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to={'/'}>
                Main
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/uncontrolled'} className="nav-link">
                Uncontrolled
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/controlled'} className="nav-link">
                Controlled
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
