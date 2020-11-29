export class formula
{
    id: number; 
    estado: number;
    script: string; 
    titulo:string;

    constructor(id:number,script:string,estado:number,titulo:string)
    {
        this.id = id;
        this.estado = estado;
        this.script =  script;
        this.titulo=titulo;
 
    }
}