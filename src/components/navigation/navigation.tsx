import { NavLink } from 'react-router-dom';
import { EmptyProps } from '../types';

const Navigation: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
                to={'/'}
              >
                Main
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={'/uncontrolled'}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Uncontrolled Form
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={'/hook'}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                React Hook Form
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
