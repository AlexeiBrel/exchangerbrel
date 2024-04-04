import React, { useEffect, useState } from 'react';
import { useFetching } from '../../hooks/useFetching';
import Header from '../../components/Header/Header';

import cl from './AdminPage.module.css';

import Service from '../../api/Services';
import HistoryTable from '../../components/HistoryTable/HistoryTable';


const AdminPage = () => {
    const [data, setData] = useState({ "total": '', "currency_code": '', "currency_name": '', "exchange_rate": '', });
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({});
    const [fetchCurrency, isLoading, error] = useFetching(async () => {
        const currency = await Service.addCurrency(data)
        console.log(currency)
        setMessage(currency)
    })

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const [date, setDate] = useState(formattedDate); //formattedDate
    const [dates, setDates] = useState([]);
    const [reports, setReports] = useState([]);
    const [ids, setIds] = useState([]);
    const [id, setId] = useState('');
    const [curs, setCurs] = useState([]);
    const [cur, setCur] = useState('');

    const [fetchReports, isLoading2, error2] = useFetching(async () => {
        const reports = await Service.getOperations(date, id, cur)
        setReports(reports.currency_data)
        setDates(reports.dates)
        setIds(reports.user_ids)
        setCurs(reports.toCurrency)
    })

    const addCurrency = (e) => {
        e.preventDefault()
        console.log(data)
        if (validateForm()) {
            fetchCurrency()
            // setData({ "total": '', "currency_code": '', "currency_name": '', "exchange_rate": '', })
        }
    }

    function validateForm() {
        const errors = {};

        if (!data.currency_code.trim()) {
            errors.currency_code = 'Валюта обмена обязателена';
        }

        if (!data.currency_name) {
            errors.currency_name = 'Название валюты обмена обязательна';
        }

        if (!data.total) {
            errors.total = 'Количество обязателбно';
        }

        if (!data.exchange_rate) {
            errors.exchange_rate = 'Обменный курс обязателен';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleChangeDate = (e) => {
        setDate(e.target.value)
        fetchReports()
    }

    const handleChangeUser = (e) => {
        setId(e.target.value)
        fetchReports()
    }

    const handleChangeCur = (e) => {
        setCur(e.target.value)
        fetchReports()
    }


    useEffect(() => {
        fetchReports()
    }, [date, id, cur])

    return (
        <div className={cl.wrap}>
            <Header />
            <main>
                <div className={cl.content}>
                    <div className={cl.wrapper} >
                        <h2>Добавление валюты</h2>
                        <form action="#">
                            <div className={cl.input__box}>
                                {errors.currency_code && <p className={cl.error}>{errors.currency_code}</p>}
                                <input
                                    maxLength={3}
                                    value={data.currency_code}
                                    onChange={(e) => setData({ ...data, currency_code: e.target.value })}
                                    type="text"
                                    placeholder="Валюта (USD)" />
                            </div>

                            <div className={cl.input__box}>
                                {errors.currency_name && <p className={cl.error}>{errors.currency_name}</p>}
                                <input
                                    maxLength={40}
                                    value={data.currency_name}
                                    onChange={(e) => setData({ ...data, currency_name: e.target.value })}
                                    type="text"
                                    placeholder="Название валюты (Доллар США)" />
                            </div>
                            <div className={cl.input__box}>
                                {errors.total && <p className={cl.error}>{errors.total}</p>}
                                <input
                                    maxLength={10}
                                    value={data.total}
                                    onChange={(e) => setData({ ...data, total: e.target.value })}
                                    type="text"
                                    placeholder="Единиц" />
                            </div>

                            <div className={cl.input__box}>
                                {errors.exchange_rate && <p className={cl.error}>{errors.exchange_rate}</p>}
                                <input
                                    maxLength={10}
                                    value={data.exchange_rate}
                                    onChange={(e) => setData({ ...data, exchange_rate: e.target.value })}
                                    type="text"
                                    placeholder="Обменный курс (3.24)" />
                            </div>
                            <div className={[cl.input__box, cl.button].join(' ')}>
                                <button onClick={addCurrency} type='button'>Добавить</button>
                            </div>
                        </form>
                        <div>
                            {message.status === 'ok' && <h3 className={cl.ok}>{message.message}</h3>}
                            {message.status === 'error' && <h3 className={cl.err}>{message.message}</h3>}
                        </div>
                    </div>
                </div>
                <div className={cl.reports}>
                    <h2>Отчеты</h2>
                    <div className={cl.select__box}>
                        <select onChange={handleChangeDate}>
                            <option value={formattedDate}>{formattedDate}</option>
                            {dates?.map(item => (
                                formattedDate !== item ? <option key={item} value={item}>{item}</option> : null
                            ))}
                        </select>
                        <select onChange={handleChangeUser}>
                            <option value=''>Все пользователи</option>
                            {ids?.map(item => (
                                <option key={item.id} value={item.id}>{item.username}</option>
                            ))}
                        </select>

                        <select onChange={handleChangeCur}>
                            <option value=''>Все валюты</option>
                            {curs?.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <HistoryTable operations={reports} />
                </div>
            </main>
        </div>
    );
};

export default AdminPage;