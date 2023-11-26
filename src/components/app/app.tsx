import { WithChildrenProps } from '../types';
import { useInitStore } from '../hooks';
import { ReactNode } from 'react';

import { useAppSelector } from '../../store/hooks';
import { Message } from '../../store/reducers/message-slice';

import styles from './app.module.css';

const App: React.FC<WithChildrenProps> = ({ children }): ReactNode => {
  useInitStore();
  const messageError: string = useAppSelector(Message.select);

  if (messageError) {
    throw new Error(messageError);
  }

  return <div className={styles.app}>{children}</div>;
};

export default App;
