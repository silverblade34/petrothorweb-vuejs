import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function graficos_data(inicio, fin, cod_cliente) {
    return axios.post(`${baseURL}dashboard/graficos_hoy`,
        {
            inicio: inicio,
            fin: fin,
            codcliente: cod_cliente
        })
}

export function data_mapa(cod_cliente, fecha) {
    return axios.post(`${baseURL}dashboard/graficos_mes`,
        {
            codcliente: cod_cliente,
            fecha: fecha
        })
}