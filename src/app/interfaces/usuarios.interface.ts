import { Usuario } from "../models/usuario.model";


export interface UsuarioDeleteResponse {
    ok: string,
    msg: string
}

export interface CargarUsuarios {
    ok: string,
    usuarios: Usuario[],
    total: number
}