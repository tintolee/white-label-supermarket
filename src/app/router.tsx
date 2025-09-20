import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';


export const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '*', element: <div className="p-6">Page Not Found</div> },
]);

