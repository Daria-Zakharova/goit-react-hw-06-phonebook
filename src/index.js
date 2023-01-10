import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global} from '@emotion/react';
import { globalStyle } from './utils/global-style'
import { App } from 'components/App/App';
import './index.css';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BeatLoader } from 'react-spinners';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={globalStyle}/>
    <Provider store = {store}>
      <PersistGate loading={<BeatLoader color="#e1d3c0" margin={3} size={10}/>} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
