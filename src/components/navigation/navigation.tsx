import { Link } from 'react-router-dom';
import { EmptyProps } from '../types';

const Navigation: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex space-x-4">
              <Link
                to={'/'}
                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
              >
                Main
              </Link>
              <Link
                to={'/uncontrolled'}
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Uncontrolled
              </Link>
              <Link
                to={'/controlled'}
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Controlled
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
