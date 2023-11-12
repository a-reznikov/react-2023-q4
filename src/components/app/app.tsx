import { AppContext, EmptyProps } from '../types';
import { Context, useCreateContext } from '../contexts';
import { Route, Routes } from 'react-router-dom';

import './app.css';
import Layout from '../router/layout';
import Main from '../main';
import NotFoundPage from '../pages';

const App: React.FC<EmptyProps> = (): JSX.Element => {
  const context: AppContext = useCreateContext();

  if (context.messageError) {
    throw new Error(context.messageError);
  }

  return (
    <Context.Provider value={context}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Context.Provider>
  );
};

export default App;
