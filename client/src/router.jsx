import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Hooks from './routes/Hooks.jsx'
import Contracts from './routes/Contracts.jsx'

export const router = createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/hooks', element: <Hooks />},
    {path: '/contracts', element: <Contracts />},
])