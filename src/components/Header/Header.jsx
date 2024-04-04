import React from 'react';
import cl from './Header.module.css'
import { Link } from 'react-router-dom';


const Header = () => {
    let role = localStorage.getItem('role');
    let login = localStorage.getItem('login');

    const hendlerExit = () => {
        localStorage.setItem('login', '');
        localStorage.setItem('role', '');
        localStorage.setItem('id', '');
    }

    return (
        <header className={cl.header}>
            {role === 'operator' ? <h2>Оператор: {login}</h2> : <h2>Админимтратор: {login}</h2>}
            <div>
                <Link onClick={hendlerExit}>Выйти</Link>
            </div>
        </header>
    );
};

export default Header;