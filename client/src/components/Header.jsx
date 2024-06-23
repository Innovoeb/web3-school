import '../styles/Header.css'
import Github from '../assets/GitHub.png'
import { Link } from 'react-router-dom'


const Header = () => {
    return ( 
        <div className="header">
            <Link to="/"><h2>Innovoeb's Web3 School</h2></Link>
            <a href="https://github.com/Innovoeb/web3-school" target="_blank">
                <img src={Github} alt="github" className="nav-icons"/>
            </a> 
        </div>
        
     );
}
 
export default Header