import { NumberSymbol, DatePipe } from "@angular/common";

export class CicloLectivo{
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        //public fechainicio: Date
    ) {}
}