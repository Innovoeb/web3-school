import { createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home.jsx'
import Hooks from './routes/Hooks.jsx'
import Contracts from './routes/Contracts.jsx'

export const router = createBrowserRouter([
    {path: '/', element: <Home />},
    {path: '/hooks', element: <Hooks />},
    {path: '/contracts', element: <Contracts />},
])