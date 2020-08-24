
export class calificaiconalumno
{
id: number;
idalumno: number;
idmateria: number;
nota: number;
idexamen: number;
observacion:string;

constructor(obj:any)
{
this.id=+obj.id;
this.idalumno=+obj.idalumno;
this.idmateria=+obj.idmateria;
this.nota=+obj.nota;
this.idexamen=+obj.idexamen;
this.observacion=obj.observacion;
}

}