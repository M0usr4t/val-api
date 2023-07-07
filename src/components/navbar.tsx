import { useLocation } from "react-router-dom";
import "./navbar.css";


export const Navbar = () => {
    const location = useLocation();
    return (
        <nav>
            <h1>Unofficial Valorant</h1>
            <ul>
                <li>
                    <a href="/" className={`link${location.pathname === '/' ? '-active' : ''}`}>Home</a>
                </li>
                <li>
                    <a href="/agents" className={`link${location.pathname === '/agents' ? '-active' : ''}`}>Agents</a>
                </li>
                <li>
                    <a href="/maps" className={`link${location.pathname === '/maps' ? '-active' : ''}`}>Maps</a>
                </li>
                <li>
                    <a href="/arsenal" className={`link${location.pathname === '/arsenal' ? '-active' : ''}`}>Arsenal</a>
                </li>
                <li>
                    <a href="https://playvalorant.com/en-us/" className="official-valorant">Official Valorant</a>
                </li>
            </ul>
        </nav>
  );
}