import { EmptyProps } from '../types';
import { Route, Routes } from 'react-router-dom';

import './app.css';
import Layout from '../router/layout';
import Main from '../main';
import NotFoundPage from '../pages';
import { useAppSelector } from '../../store/hooks';
import { Message } from '../../store/reducers/message-slice';

const App: React.FC<EmptyProps> = (): JSX.Element => {
  const messageError: string = useAppSelector(Message.select);

  if (messageError) {
    throw new Error(messageError);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
