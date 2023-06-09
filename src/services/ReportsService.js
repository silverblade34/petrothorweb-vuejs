import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function reportesData(cod_cliente, cod_cisterna, inicio, fin) {
  return axios.post(`${baseURL}reportes/data`, {
    cliente: cod_cliente,
    cisterna: cod_cisterna,
    inicio: inicio,
    fin: fin
  });
}

export function listClientesCisternas(codempresa, codcliente) {
  return axios.post(`${baseURL}reportes/clientes_cisternas`, {
    codempresa: codempresa,
    codcliente: codcliente
  });
}