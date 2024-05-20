// In App.js in a new project

import * as React from 'react';
import {persistedStore, store} from './src/redux/Store.js';
import {Provider} from 'react-redux';
import {AppRoute} from './src/navigation/AppRoute.js';
import {PersistGate} from 'redux-persist/integration/react';
import DToastProvider from './src/components/CustomToast.js';


const App = () => {
  return (
    <DToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <AppRoute />
        </PersistGate>
      </Provider>
    </DToastProvider>
  );
};

export default App;
