import React from 'react';
import './Block.css';

export const Block = ({ defaultCurrencies, value, value1, currency, currency1, onChangeValue, onChangeCurrency, onChangeCurrency1, onClickBtn }) => {
    return (<div className="block">
        <ul className="currencies">
            {defaultCurrencies.map((cur) => (
                <li
                    onClick={() => onChangeCurrency(cur.currency_code)}
                    className={currency === cur.currency_code ? 'active' : ''}
                    key={cur.currency_code + Math.round()}>
                    {cur.currency_code}
                </li>
            ))}
            <li>
                <svg height="50px" viewBox="0 0 50 50" width="50px">
                    <rect fill="none" height="50" width="50" />
                    <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                </svg>
            </li>
        </ul>
        <input
            onChange={(e) => onChangeValue(e.target.value)}
            value={value}
            type="number"
            placeholder={0}
        />

        <ul className="currencies">
            {defaultCurrencies.map((cur) => (
                <li
                    onClick={() => onChangeCurrency1(cur.currency_code)}
                    className={currency1 === cur.currency_code ? 'active' : ''}
                    key={cur.currency_code + Math.round()}>
                    {cur.currency_code}
                </li>
            ))}
            <li>
                <svg height="50px" viewBox="0 0 50 50" width="50px">
                    <rect fill="none" height="50" width="50" />
                    <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                </svg>
            </li>
        </ul>

        <div className='btns'>
            <h3>Результат обмена: {value1}</h3>
            <button onClick={onClickBtn} className='btn' type='button'>Обменять</button>
        </div>
    </div>)
};