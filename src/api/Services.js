import axios from "axios";

export default class Service {
    static async getCurrency() {
        const response = await axios.get('http://exchanger/server/get_currency.php');
        return response.data
    }

    static async getRates(date) {//cur
        const response = await axios.get(`http://exchanger/server/get_rates.php?date=${date}`);
        return response.data
    }

    static async addCurrency(data) {
        const response = await axios.post('http://exchanger/server/adding_currency.php', {
            total: data.total,
            currency_code: data.currency_code.toUpperCase(),
            currency_name: data.currency_name,
            exchange_rate: data.exchange_rate,
        });
        return response.data
    }

    static async registration(data) {
        const response = await axios.post('http://exchanger/server/register.php', {
            username: data.username,
            login: data.login,
            role: data.role,
            password: data.password
        });
        return response.data
    }

    static async auth(data) {
        const response = await axios.post('http://exchanger/server/auth.php', {
            login: data.login,
            password: data.password,
            role: data.role
        });
        return response.data
    }

    static async operationsSession(id, data) {
        const response = await axios.post('http://exchanger/server/adding_operation.php', {
            user_id: id,
            fromCurrency: data.fromCurrency,
            fromPrice: data.fromPrice,
            rate: data.rate,
            toCurrency: data.toCurrency,
            toPrice: data.toPrice,
        });
        return response.data
    }

    static async getOperations(date, user_id, cur) {
        const response = await axios.get(`http://exchanger/server/get_operations.php?date=${date}&user_id=${user_id}&cur=${cur}`);
        return response.data
    }
}
