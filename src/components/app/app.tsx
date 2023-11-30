import { EmptyProps } from '../types';
import { Route, Routes } from 'react-router-dom';

import './app.css';
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
      <Route path="/" element={<Main />} />
      <Route path="uncontrolled" element={<p>Uncontrolled</p>} />
      <Route path="controlled" element={<p>React Hook Form</p>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
