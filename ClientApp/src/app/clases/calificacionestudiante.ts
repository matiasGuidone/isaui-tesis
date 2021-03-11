
export class calificacionestudiante
{ 
idestudiante: number; 
nota: number;
idexamen: number; 
id: number;

constructor(obj:any)
{ 
this.idestudiante=+obj.idestudiante; 
this.nota=+obj.nota;
this.idexamen=+obj.idexamen; 
this.id = +obj.id;
}

}