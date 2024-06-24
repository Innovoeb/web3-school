import GitHub from '../assets/GitHub.png'
import Home from '../assets/home.png'
import '../styles/MobileNavbar.css'
import { Link } from 'react-router-dom'


const MobileNavbar = () => {
    return ( 
        <div className="mobile-navbar">
            <Link to="/"><img src={Home} alt="home" className='mobile-nav-icons'/></Link>
            <a href="https://github.com/Innovoeb/web3-school" target="_blank">
                <img src={GitHub} alt="github" className="mobile-nav-icons"/>
            </a> 
        </div>
     );
}
 
export default MobileNavbar