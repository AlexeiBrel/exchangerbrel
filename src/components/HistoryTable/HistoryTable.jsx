import React from 'react';
import cl from './HistoryTable.module.css'


const HistoryTable = ({ operations }) => {
    return (
        <div className={cl.scroll__table}>
            <table className={cl.table} cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Из валюты</th>
                        <th>Цена</th>
                        <th>Курс обмена</th>
                        <th>В валюту</th>
                        <th>Результат</th>
                    </tr>
                </thead>
            </table>

            <div className={cl.scroll__table__body}>
                {operations.length === 0
                    ? <h2 style={{ marginTop: '20px' }}>Данные отсутствуют</h2>
                    : <table className={cl.table} cellPadding="0" cellSpacing="0">
                        <tbody>
                            {operations.map(item => (
                                <tr key={item.date + Math.random()}>
                                    <td>{item.date}</td>
                                    <td>{item.fromCurrency}</td>
                                    <td>{item.fromPrice}</td>
                                    <td>{item.rate}</td>
                                    <td>{item.toCurrency}</td>
                                    <td>{item.toPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
};

export default HistoryTable;