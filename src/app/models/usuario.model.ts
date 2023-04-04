import { environment } from 'src/environments/environment';

export class Usuario {
    
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ) {

    }

    private urlApi : string = environment.urlApi;

    get imagenUrl() {
        if( this.img ) {
            if( this.img.includes('https')) {
                return this.img;
            }
            else {
                return `${ this.urlApi }/upload/usuarios/${ this.img }`;
            }
        }
        else {
            return  `${ this.urlApi }/upload/usuarios/no-image`;
        }

    }


}