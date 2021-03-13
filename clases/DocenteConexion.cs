
using System.Collections.Generic;
using System.Data;


    public class DocenteConexion<T> : ObjetoConexion<docente>
    {
       
        private static DocenteConexion<T> instance;
         public static DocenteConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new DocenteConexion<T>(new docente());
                return instance;
            }
        } 
        private DocenteConexion(oObjeto aux): base(aux){ 
            
        }  

        public List<T> serchDniLastName(string dato)
        {
            string consulta = $"SELECT * FROM {this.tipo.GetType()} ";
            if(dato!=null)
            {
                consulta+=$"WHERE dni LIKE '%{dato}%' OR nombre  LIKE '%{dato}%' OR apellido LIKE '%{dato}%'";
            }
             return (List<T>)Conexion.consultaList<T>(consulta);
             
        }  
         public bool RegistrarRol( docente doc )
        {  
            var n = false;
            var Tabla = this.Conexion.consultaDataTable($"SELECT roles.* FROM usuario JOIN rolesusuario on usuario.Id = rolesusuario.Idusuario JOIN roles on roles.Id = rolesusuario.Idroles  WHERE usuario.id = {doc.Idusuario} ").Tables[0];
            foreach (DataRow r in Tabla.Rows)
                {
                    if(r["nombre"].ToString().ToUpper().Equals("DOCENTE")){
                        n = true; break;
                    } 
                }
            if (n == false){
                var roldocente = RolesConexion<roles>.Instance.SearchAll(null," and roles.nombre like 'Docente'");
                if(roldocente.Count> 0){
                    rolesusuario rul = new rolesusuario();
                    rul.Idusuario = doc.Idusuario;
                    rul.Idroles = roldocente[0].Id;
                    rul.Descripcion = "Alta de docente";
                    RolesusuarioConexion<rolesusuario>.Instance.Insert(rul);
                    n = true;
                }
                else{
                    roles rol = new roles();
                    rol.Nombre = "Docente";
                    RolesConexion<roles>.Instance.Insert(rol);
                    roldocente = RolesConexion<roles>.Instance.SearchAll(null," and roles.nombre like 'Docente'");
                    rolesusuario rul = new rolesusuario();
                    rul.Idusuario = doc.Idusuario;
                    rul.Idroles = roldocente[0].Id;
                    rul.Descripcion = "Alta de docente";
                    RolesusuarioConexion<rolesusuario>.Instance.Insert(rul);
                    n = true;
                }
            }

            return n;
        }


    }
 