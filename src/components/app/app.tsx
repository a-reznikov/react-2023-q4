import { EmptyProps } from '../types';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { Message } from '../../store/reducers/message-slice';

import Main from '../main';
import { Uncontrolled, Controlled } from '../forms';
import NotFoundPage from '../pages';

const App: React.FC<EmptyProps> = (): JSX.Element => {
  const messageError: string = useAppSelector(Message.select);

  if (messageError) {
    throw new Error(messageError);
  }

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="uncontrolled" element={<Uncontrolled />} />
      <Route path="controlled" element={<Controlled />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
