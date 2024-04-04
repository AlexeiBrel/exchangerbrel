import React, { useEffect, useState, useRef } from 'react';
import { useFetching } from '../../hooks/useFetching';

import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import HistoryTable from '../../components/HistoryTable/HistoryTable';
import Service from '../../api/Services';

import cl from './OperatorPage.module.css';
import { Block } from '../../components/Block/Block';

const OperatorPage = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const [date, setDate] = useState(formattedDate); //formattedDate
    const [currency, setCurrency] = useState([]);
    const [fetchCurrency, isLoading, error] = useFetching(async () => {
        const currency = await Service.getCurrency()
        setCurrency(currency)
    })

    // const ratesRef = useRef({})
    const [rates, setRates] = useState({})
    const [fetchRates, isLoadingRates, errorRates] = useFetching(async () => {
        const rates = await Service.getRates(date);
        // ratesRef.current = rates[0].rates
        setRates(rates[0].rates)
        // onChangeToPrice(1)
    })

    const [fetchGetOperation, isLoadingGetOperation, errorGetOperation] = useFetching(async () => {
        const operations = await Service.getOperations(formattedDate, localStorage.getItem('id'), '')
        console.log('operations :>> ', operations);
        setOperations(operations.currency_data)
    })

    const [session, setSession] = useState({ date: '', toCurrency: '', toPrice: '', rate: '', fromCurrency: '', fromPrice: '' });
    const [operations, setOperations] = useState([]);
    const [fetchOperation, isLoadingOperation, errorOperation] = useFetching(async () => {
        const addReport = await Service.operationsSession(localStorage.getItem('id'), session)
        console.log('addReport :>> ', addReport);
    })

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(0);
    const defaultCurrencyData = currency && currency.currency_data && currency.currency_data[date] ? currency.currency_data[date] : [];

    useEffect(() => { fetchRates(); }, [date]);

    const onChangeFromPrice = (value) => {
        // const price = value / ratesRef.current[fromCurrency]
        // const result = price * ratesRef.current[toCurrency];
        const price = value / rates[fromCurrency]
        const result = price * rates[toCurrency];
        setToPrice(result.toFixed(3));
        setFromPrice(value);
        setSession((prevSession) => ({
            ...prevSession,
            date: date,
            fromCurrency: fromCurrency,
            fromPrice: value,
            rate: rates[fromCurrency],
            toCurrency: toCurrency,
            toPrice: result.toFixed(3)
        }));
        // setSession({ date: date, fromCurrency: fromCurrency, fromPrice: fromPrice, rate: rates[fromCurrency], toCurrency: toCurrency, toPrice: toPrice })
    }

    useEffect(() => {
        setOperations([session, ...operations])
        fetchOperation()
    }, [session])

    // const onChangeToPrice = (value) => {
    //     const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    //     setToPrice(result.toFixed(3));
    //     setFromPrice(value);
    //     setOperations([...operations, { date: date, toCurrency: toCurrency, toPrice: toPrice, rate: ratesRef.current[toCurrency], fromCurrency: fromCurrency, fromPrice: fromPrice }])
    //     setSession({ date: date, toCurrency: toCurrency, toPrice: toPrice, rate: ratesRef.current[toCurrency], fromCurrency: fromCurrency, fromPrice: fromPrice })
    //     fetchOperation()
    // }

    // useEffect(() => { onChangeFromPrice(fromPrice) }, [])
    // useEffect(() => { onChangeToPrice(toPrice) }, [toCurrency])

    const hendllerSelectDate = (value) => { setDate(value); }

    useEffect(() => {
        fetchCurrency()
        fetchGetOperation()
    }, [])

    return (
        <>
            {isLoading ? <h2>Loading</h2> : (
                <div className={cl.wrap}>
                    <Header />
                    <main>
                        <div className={cl.content}>
                            <div className={cl.wrapper}>
                                <div className={cl.wrapper}>
                                    <form action="#">
                                        <div className={cl.input__box}>
                                            <select onChange={e => hendllerSelectDate(e.target.value)}>
                                                <option value={formattedDate}>{formattedDate}</option>
                                                {currency.dates?.map(item => (
                                                    formattedDate !== item ? <option key={item} value={item}>{item}</option> : null
                                                ))}
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                {defaultCurrencyData.length === 0
                                    ? <h3>Нет актуальных курсов валют на {date}</h3>
                                    : <Table currency={currency} date={date} />
                                }
                            </div>
                            <div className={cl.container}>
                                <div className={cl.form__block}>
                                    {defaultCurrencyData.length !== 0 ?
                                        <div className={cl.block}>
                                            <Block
                                                defaultCurrencies={defaultCurrencyData}
                                                value={fromPrice}
                                                value1={toPrice}
                                                currency={fromCurrency}
                                                currency1={toCurrency}
                                                onChangeCurrency={setFromCurrency}
                                                onChangeCurrency1={setToCurrency}
                                                onChangeValue={setFromPrice}
                                                onClickBtn={(e) => onChangeFromPrice(fromPrice)} />

                                            {/* <Block
                                                defaultCurrencies={defaultCurrencyData}
                                                value={toPrice}
                                                currency={toCurrency}
                                                onChangeCurrency={setToCurrency}
                                                onChangeValue={onChangeToPrice} /> */}
                                        </div>
                                        : <h3>Нет актуальных курсов валют на {date}</h3>
                                    }
                                </div>
                                <div>
                                    <h2 style={{ marginBottom: '20px' }}>Результаты обмена</h2>
                                    <HistoryTable operations={operations} />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </>
    );
};

export default OperatorPage;