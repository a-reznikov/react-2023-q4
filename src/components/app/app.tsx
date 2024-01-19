import { WithChildrenProps } from '../types';
import { ReactNode } from 'react';

import { useAppSelector } from '../../store/hooks';
import { Message } from '../../store/reducers/message-slice';

const App: React.FC<WithChildrenProps> = ({ children }): ReactNode => {
  const messageError: string = useAppSelector(Message.select);

  if (messageError) {
    throw new Error(messageError);
  }

  return (
    <div
      className="d-flex flex-column flex-grow-1 justify-content-between"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  );
};

export default App;
