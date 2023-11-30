import { EmptyProps } from '../types';
import Navigation from '../navigation';

const Main: React.FC<EmptyProps> = (): JSX.Element => {
  return (
    <main className="main">
      <Navigation />
    </main>
  );
};

export default Main;
