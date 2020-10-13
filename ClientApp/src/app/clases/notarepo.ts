
export class notarepo
{
materia: string;
tipoexamen:string;
nota: number;
fecha: Date;

constructor(obj:any)
{

    this.materia=obj.materia;
    this.tipoexamen=obj.tipoexamen;
    this.nota=+obj.nota;
    
}

}