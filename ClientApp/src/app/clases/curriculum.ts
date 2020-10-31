export class curriculum{
    id : number;
    nombre : string;
    apellido : string;
    fechanac: Date;
    sexo: number;
    numerodoc : string;
    telefono : string;
    telefonodos : string;
    
    correo : string;
    observaciones : string;
    tipodoc : number;  
    iddomicilio : number; 
    idusuario:number;
    
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.apellido =  obj.apellido;
        this.fechanac =  new Date(obj.fechanac);
        this.sexo =  +obj.sexo;
        this.numerodoc = obj.numerodoc.toString();
        this.telefono= obj.telefono.toString();
        this.telefonodos = obj.telefonodos.toString();
        this.correo = obj.correo ; 
        this.observaciones = obj.observaciones; 
        this.tipodoc = +obj.tipodoc; 
        this.iddomicilio = +obj.iddomicilio;
        this.idusuario= +obj.idusuario;
       

    }
    
}
// id: 0,
// nombre: '',
// apellido: '',
// fechanac:  '',
// sexo: 1,
// numerodoc: '',
// telefono: '',
// correo: '',
// telefonodos: '',
// tipodoc: '',
// idlocalidad: '',
// domicilio: '',


// this.Id=Convert.ToInt32(dr["id"]);
// this.Nombre= dr["nombre"].ToString();
// this.Apellido= dr["apellido"].ToString();
// this.Numerodoc= dr["numerodoc"].ToString();
// this.Telefonosdos=dr["telefonodos"].ToString();
// this.Telefono= dr["telefono"].ToString();
// this.Correo= dr["correo"].ToString();
// this.Observaciones= dr["observaciones"].ToString();
// this.Idadjunto=Convert.ToInt32(dr["idadjunto"]);
// this.Iddomicilio= Convert.ToInt32(dr["iddomicilio"]);
// this.Tipodoc= Convert.ToInt32(dr["tipodoc"]);