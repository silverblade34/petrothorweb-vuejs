import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function listarUsuarios(codempresa,tipousuario) {
    return axios.get(`${baseURL}usuarios/listar_clientes?tipousuario=${tipousuario}&codempresa=${codempresa}`);
}

export function crearUsuarios(){
    
}