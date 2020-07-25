export class carrera{
    id : number;
    nombre : string;
    descripcion : string;
    
    
    constructor(id: string, nomb:string, des:string){
        this.id = +id;
        this.nombre = nomb;
        this.descripcion =  des;
}
}