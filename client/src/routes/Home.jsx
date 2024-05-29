import { useEffect } from 'react'
import '../styles/Home.css'
import { Link } from 'react-router-dom'


const Home = () => {


    return ( 
        <div className="home-content">
            <Link to='/hooks'><div className="card">Hooks</div></Link>
            <Link to='/contracts'><div className="card">Contracts</div></Link>
        </div> 
    )
}
 
export default Home
