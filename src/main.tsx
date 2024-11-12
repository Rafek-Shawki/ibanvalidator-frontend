import ReactDOM from 'react-dom/client'
import './index.css'
import { setupStore } from './store/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const store = setupStore();

const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<App />}>

        </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
        <Provider store={store} >
            <RouterProvider router={router} />
        </Provider>
);