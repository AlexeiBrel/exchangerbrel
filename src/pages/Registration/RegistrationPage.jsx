import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { useFetching } from '../../hooks/useFetching';
import Service from '../../api/Services';

import cl from './RegistrationPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

const RegistrationPage = () => {
    const [openRegForm, setOpenRegForm] = useState(false);
    const [openLogForm, setopenLogForm] = useState(true);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('')
    const [registrationData, setRegistrationData] = useState({ username: '', login: '', role: '', password: '' })
    const [authData, setAuthData] = useState({ login: '', password: '', role: '' })
    const navigate = useNavigate();
    const { user, setUser } = useAuth({});

    const [fetchUser, isLoading, error] = useFetching(async () => {
        const regData = await Service.registration(registrationData)
        console.log(regData)

        setStatus(regData.message)
    })

    const [fetchAuth, isLoadingAuth, errorAuth] = useFetching(async () => {
        const regData = await Service.auth(authData)
        console.log('regData', regData)
        setStatus(regData.message)

        if (regData.status === 'ok') {
            if (regData.session.role === 'admin') {
                navigate('/admin', { replaceplace: true });
            } else {
                navigate('/', { replaceplace: true });
            }

            localStorage.setItem('role', regData.session.role)
            localStorage.setItem('login', regData.session.login)
            localStorage.setItem('id', regData.session.id)
            setUser(regData.session)
        }
    });


    function validateForm() {
        const errors = {};

        if (!registrationData.username.trim()) {
            errors.username = 'Имя обязательно';
        }

        if (!registrationData.login.trim()) {
            errors.login = 'Логин обязателен';
        }

        if (!registrationData.role) {
            errors.role = 'Выберите роль';
        }

        if (registrationData.password.length < 6) {
            errors.password = 'Длинна не менее 6';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(registrationData)
        if (validateForm()) {
            fetchUser()
            setRegistrationData({ username: '', login: '', role: '', password: '' })
        }
    }

    function validateFormAuth() {
        const errors = {};

        if (!authData.login.trim()) {
            errors.login = 'Логин обязателен';
        }

        if (!authData.role) {
            errors.role = 'Выберите роль';
        }

        if (authData.password.length < 6) {
            errors.password = 'Длинна не менее 6';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleSubmitAuth = (e) => {
        e.preventDefault()
        console.log(authData)

        if (validateFormAuth()) {
            fetchAuth()
            setRegistrationData({ login: '', password: '', role: '' })
        }
    }

    function handlerOpenRegForm() {
        setopenLogForm(false);
        setOpenRegForm(true);
        setStatus('')
        setRegistrationData({ username: '', login: '', role: '', password: '' })
    }

    function handlerOpenLogForm() {
        setOpenRegForm(false)
        setopenLogForm(true)
        setStatus('')
        setAuthData({ login: '', role: '', password: '' })
    }

    return (
        <div className={cl.wrap}>
            {openRegForm && <div className={cl.wrapper}>
                <h2>Регистрация</h2>
                <form action="#">
                    <div className={cl.input__box}>
                        {errors.username && <p className={cl.error}>{errors.username}</p>}
                        <input className={errors.username ? cl.error : null} type="text" placeholder="Имя" value={registrationData.username} onChange={(e) => setRegistrationData({ ...registrationData, username: e.target.value })} />
                    </div>
                    <div className={cl.input__box} >
                        {errors.login && <p className={cl.error}>{errors.login}</p>}
                        <input className={errors.login ? cl.error : null} type="text" placeholder="Логин" value={registrationData.login} onChange={(e) => setRegistrationData({ ...registrationData, login: e.target.value })} />
                    </div>
                    <div className={cl.input__box}>
                        {errors.role && <p className={cl.error}>{errors.role}</p>}
                        <select className={errors.role ? cl.error : null} placeholder="Роль" value={registrationData.role} onChange={(e) => setRegistrationData({ ...registrationData, role: e.target.value })}>
                            <option value="">Роль</option>
                            <option value="admin">Администратор</option>
                            <option value="operator">Оператор</option>
                        </select>
                    </div>
                    <div className={cl.input__box}>
                        {errors.password && <p className={cl.error}>{errors.password}</p>}
                        <input className={errors.password ? cl.error : null} type="password" placeholder="Пароль" value={registrationData.password} onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })} />
                    </div>
                    <div className={[cl.input__box, cl.button].join(' ')}>
                        <button type='button' onClick={handleSubmit}>Зарегистрироваться</button>
                    </div>
                    <div className={cl.text}>
                        <h3>У вас уже есть аккаунт?<button onClick={handlerOpenLogForm}>Войти</button></h3>
                    </div>
                    <div className={cl.text}>
                        <h4 className={cl.status}>{status}</h4>
                    </div>
                </form>
            </div>}


            {openLogForm && <div className={cl.wrapper} >
                <h2>Вход</h2>
                <form action="#">
                    <div className={cl.input__box}>
                        {errors.login && <p className={cl.error}>{errors.login}</p>}
                        <input className={errors.login ? cl.error : null} type="text" placeholder="Логин" value={authData.login} onChange={(e) => setAuthData({ ...authData, login: e.target.value })} />
                    </div>
                    <div className={cl.input__box}>
                        {errors.password && <p className={cl.error}>{errors.password}</p>}
                        <input className={errors.password ? cl.error : null} type="password" placeholder="Пароль" value={authData.password} onChange={(e) => setAuthData({ ...authData, password: e.target.value })} />
                    </div>
                    <div className={cl.input__box}>
                        {errors.role && <p className={cl.error}>{errors.role}</p>}
                        <select className={errors.role ? cl.error : null} placeholder="Роль" value={authData.role} onChange={(e) => setAuthData({ ...authData, role: e.target.value })}>
                            <option value="">Роль</option>
                            <option value="admin">Администратор</option>
                            <option value="operator">Оператор</option>
                        </select>
                    </div>
                    <div className={[cl.input__box, cl.button].join(' ')}>
                        <button type='button' onClick={handleSubmitAuth}>Войти</button>
                    </div>
                    <div className={cl.text}>
                        <h3>Нет аккаунта? <button onClick={handlerOpenRegForm}>Регистрация</button></h3>
                    </div>
                    <div className={cl.text}>
                        <h4 className={cl.status}>{status}</h4>
                    </div>
                </form>
            </div>}

        </div>
    );
};

export default RegistrationPage;

// , regData.status === 'ok' ? '' : cl.error