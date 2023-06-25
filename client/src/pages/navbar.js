import './styles.css';
import { NavLink } from 'react-router-dom';
import tree from "../assets/images/tree-logo.png"
import { useState } from 'react';


export const Navbar = () => {
    const [active, setActive] = useState(1);
    const setLink = (index) =>{
        setActive(index);
    }
    return (
        <>
                <header className='navbar-header'>
                    <div className="navbar-logo">
                    <h2>BetterEarth</h2> <img className="tree-logo" src={tree} alt="logo" /> 
                    </div>
                    <nav>
                        <ul>
                        <li><NavLink to="/">Home</NavLink> </li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        </ul>
                    </nav>
                </header>
        </>
    );
}