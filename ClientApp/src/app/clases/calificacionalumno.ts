
export class calificacionalumno
{ 
idalumno: number; 
nota: number;
idexamen: number; 
id: number;

constructor(obj:any)
{ 
this.idalumno=+obj.idalumno; 
this.nota=+obj.nota;
this.idexamen=+obj.idexamen; 
this.id = +obj.id;
}

}