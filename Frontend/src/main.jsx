import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import "./app/App.css"

import { Provider } from 'react-redux'
import store from './app/store.js'

import { RouterProvider } from 'react-router-dom'
import router from './app/app.routes.jsx'

import useAuth from './features/auth/hook/useAuth.js'


function Root() {

  const { getUserHandler } = useAuth();

  useEffect(() => {
    getUserHandler();
  }, []);

  return <RouterProvider router={router} />;
}


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <Root />
    </Provider>

  </StrictMode>
)