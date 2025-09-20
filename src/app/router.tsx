import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Admin from '../pages/Admin';

export const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/admin', element: <Admin /> },
    { path: '*', element: <div className="p-6">Page Not Found</div> },
]);

