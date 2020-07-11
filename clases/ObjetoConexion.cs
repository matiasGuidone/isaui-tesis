//Insertar
//Modificar
//Borrado
//Consultas con filtros
using System;
using System.Collections.Generic;
using System.Collections;
using System.Data;
using System.Reflection;
using MySql.Data.MySqlClient;

public class ObjetoConexion<T> {
   
        internal Conexion Conexion { get;set; }
         oObjeto tipo;
         public ObjetoConexion(oObjeto t){
            this.tipo = t;
            this.Conexion= new Conexion();
         }
 
        // private ControlAlumnos({ get;set; })
        // {
        //     Con = new ConexionPg();
        //     Alumnos = new List<Alumno>();
            
        // }

        // public static ControlAlumnos Instance
        // {
        //     get
        //     {
        //         if (instance == null)
        //             instance = new this();
        //         return instance;
        //     }
        // } 

        public List<T> SearchAll()
        {
            // Type myType = objeto.GetType();
            // IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties());

            // foreach (PropertyInfo prop in props)
            // {
            //     object propValue = prop.GetValue(objeto, null);

            //     // Do something with propValue
            // }
        	string consulta = $"SELECT * FROM {tipo.GetType()} ORDER BY 1 ASC";
             
            return (List<T>)Conexion.consultaList<T>(consulta);
            // this.Alumnos  = temAlumno;
            // return Instance.Con.consultaDataTable(consulta);
        }
       

        public void Insert(oObjeto objeto)
        {	
            //Type myType = objeto.GetType();

            // Lista de propiedades del objeto que recobe por parametro
            IList<PropertyInfo> props = new List<PropertyInfo>(objeto.GetType().GetProperties());
            // inicilizar la lista de parametros para la consutla de insercion
            List<MySqlParameter> param = new List<MySqlParameter>();
            //cadenas de consulta 
            String consulta = $"INSERT INTO {objeto.GetType()} ( ";
            String valores = " VALUES (";
            // recorre las propiedades del objeto
                foreach (PropertyInfo prop in props)
                {
                    if (prop.Name != "ID"){
                    object propValue = prop.GetValue(objeto, null);
                    param.Add(new MySqlParameter (prop.Name ,propValue ));

                    consulta += $" {prop.Name} ,";
                    valores += $" ?{prop.Name} ,";
                    // Do something with propValue
                    }
                   
                }
                // cada vez que finalize hacemos un substring de la ultima coma para cerrar la consulta
                consulta = consulta.Substring(0,consulta.Length-1) +" )";
                 valores = valores.Substring(0,valores.Length-1) +" )";

                // Unimos consulta y valores

                consulta = consulta + valores;

                Conexion.ConsultaParametros(consulta, param);

                
            //                   $"(nombre, apellido, nroDocumento, email, celular) VALUES (@NOMBRE, @APELLIDO, @NRODOCUMENTO, @EMAIL, @CELULAR)";
        	// List<pgsqlParameter> param =new List<NpgsqlParameter>();
        	// param.Add(new NpgsqlParameter ("NOMBRE",parametro .Nombre ));
        	// param.Add(new NpgsqlParameter ("APELLIDO",parametro .Apellido  ));
        	// param.Add(new NpgsqlParameter ("NRODOCUMENTO",parametro .NroDocumento  ));
        	// param.Add(new NpgsqlParameter ("EMAIL",parametro .Email ));
        	// param.Add(new NpgsqlParameter ("CELULAR",parametro .Celular  ));
        	// Instance.Con.ConsultaParametros(consulta,param);
            

        }
        public void Update(oObjeto objeto)
        {
                    
            // Lista de propiedades del objeto que recobe por parametro
            IList<PropertyInfo> props = new List<PropertyInfo>(objeto.GetType().GetProperties());
            // inicilizar la lista de parametros para la consutla de insercion
            List<MySqlParameter> param = new List<MySqlParameter>();
            //cadenas de consulta 
            String consulta = $"UPDATE {objeto.GetType()}  SET ";
            //String valores = " SET ";
            // recorre las propiedades del objeto
                foreach (PropertyInfo prop in props)
                {
                    if (prop.Name != "ID"){
                    object propValue = prop.GetValue(objeto, null);
                    param.Add(new MySqlParameter (prop.Name ,propValue ));

                    consulta += $" {prop.Name} = ?{prop.Name},";
                    //valores += $" ?{prop.Name} ,";
                    // Do something with propValue
                    }
                   
                }
                // cada vez que finalize hacemos un substring de la ultima coma para cerrar la consulta
                consulta = consulta.Substring(0,consulta.Length-1) +" WHERE ID = "+ objeto.Id;
                // valores = valores.Substring(0,valores.Length-1) +" )";

                // Unimos consulta y valores

                //consulta = consulta + valores;

                Conexion.ConsultaParametros(consulta, param);

        }
         public void Delete(int ID, oObjeto param = null)
        {
            //si el objeto no es null se elimina ese objeto
            if (param != null){
                String consulta = $"DELETE FROM {this.tipo.GetType()} WHERE ID = ?ID";
                List<MySqlParameter> parametro = new List<MySqlParameter>();
                parametro.Add(new MySqlParameter("ID", param.Id));
                Conexion.ConsultaParametros(consulta, parametro);
            }
            else {
                //si el objeto es nulo se elimina por ID
                String consulta = $"DELETE FROM {this.tipo.GetType()} WHERE ID = ?ID";
                List<MySqlParameter> parametro = new List<MySqlParameter>();
                parametro.Add(new MySqlParameter("ID", ID));
                Conexion.ConsultaParametros(consulta, parametro);
            }
           
        }

        public T SearchId(int ID) {
            // oObjeto retorna;
             string consulta = $"SELECT * FROM {this.tipo.GetType()} Where ID = {ID}";
             var temp = new List<T>();
             temp = (List<T>)Conexion.consultaList<T>(consulta);
             return temp[0];
            // return retorna;
            //return null;
        }
       
       
            
        
}