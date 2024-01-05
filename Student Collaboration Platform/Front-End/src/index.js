  import React, { useReducer } from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  import 'bootstrap/dist/css/bootstrap.css'
  import '../node_modules/font-awesome/css/font-awesome.min.css'
  import { configureStore } from '@reduxjs/toolkit';
  import { Provider } from 'react-redux';
  import userReducer from './features/user'
  import { PersistGate } from 'redux-persist/integration/react';
  import { persistStore } from 'redux-persist';

  const store = configureStore({
    reducer : {
      user : userReducer
    }
  })

  const persistor = persistStore(store)

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
