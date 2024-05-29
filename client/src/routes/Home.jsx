
import '../styles/Home.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const { obj } = require('../data.js')



const Home = () => {

    useEffect(() => obj.greeting(), [])

    return ( 
        <div className="home-content">
            <Link to='/hooks'><div className="card">Hooks</div></Link>
            <Link to='/contracts'><div className="card">Contracts</div></Link>
        </div> 
    )
}
 
export default Home
