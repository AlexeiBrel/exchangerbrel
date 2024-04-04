import React from 'react';
import cl from './Table.module.css'

const Table = ({ currency, date }) => {
    const currencyForCurrentDate = currency && currency.currency_data && currency.currency_data[date] ? currency.currency_data[date] : [];

    return (
        <table className={cl.table} cellPadding="0" cellSpacing="0">
            <thead>
                <tr>
                    <th>Код</th>
                    <th>Единица</th>
                    <th>Валюта</th>
                    <th>Курс</th>
                </tr>
            </thead>
            <tbody>
                {currencyForCurrentDate.map(item => (
                    <tr key={item.id}>
                        <td>{item.currency_code}</td>
                        <td>{item.total}</td>
                        <td>{item.currency_name}</td>
                        <td>{item[item.currency_code]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default Table;