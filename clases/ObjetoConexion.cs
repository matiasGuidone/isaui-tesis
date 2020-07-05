//Insertar
//Modificar
//Borrado
//Consultas con filtros
using System;
using System.Collections.Generic;
using System.Collections;
using System.Data;

public class ObjetoConexion<T> {
   
        internal Conexion Conexion { get;set; }
         
 
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

        public List<T> SearchAll(oObjeto tipo)
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
            // Type myType = objeto.GetType();
            // IList<PropertyInfo> props = new List<PropertyInfo>(myType.GetProperties());
            // String consulta = $"INSERT INTO {objeto.GetType()} ( ";
            //     foreach (PropertyInfo prop in props)
            //     {
            //         object propValue = prop.GetValue(objeto, null);
            //         consulta += $" {objeto.GetType()} ";
            //         // Do something with propValue
            //     }
            //                   $"(nombre, apellido, nroDocumento, email, celular) VALUES (@NOMBRE, @APELLIDO, @NRODOCUMENTO, @EMAIL, @CELULAR)";
        	// List<NpgsqlParameter> param =new List<NpgsqlParameter>();
        	// param.Add(new NpgsqlParameter ("NOMBRE",parametro .Nombre ));
        	// param.Add(new NpgsqlParameter ("APELLIDO",parametro .Apellido  ));
        	// param.Add(new NpgsqlParameter ("NRODOCUMENTO",parametro .NroDocumento  ));
        	// param.Add(new NpgsqlParameter ("EMAIL",parametro .Email ));
        	// param.Add(new NpgsqlParameter ("CELULAR",parametro .Celular  ));
        	// Instance.Con.ConsultaParametros(consulta,param);
            

        }
        public void Update(oObjeto objeto)
        {
            // String consulta = "UPDATE  \"ISAUI\".alumno SET nombre = @NOMBRE, apellido = @APELLIDO, nrodocumento = @NRODOCUMENTO, email = @EMAIL, celular= @CELULAR WHERE codalumno = @CODALUMNO";
            // List<NpgsqlParameter> param = new List<NpgsqlParameter>();
            // param.Add(new NpgsqlParameter("NOMBRE", parametro.Nombre));
            // param.Add(new NpgsqlParameter("APELLIDO", parametro.Apellido));
            // param.Add(new NpgsqlParameter("NRODOCUMENTO", parametro.NroDocumento));
            // param.Add(new NpgsqlParameter("EMAIL", parametro.Email));
            // param.Add(new NpgsqlParameter("CELULAR", parametro.Celular));
            // param.Add(new NpgsqlParameter("CODALUMNO", parametro.codAlumno));
            // Instance.Con.ConsultaParametros(consulta, param);


        }
         public void Delete(int parametro)
        {

           
            // String consulta = "DELETE FROM \"ISAUI\".alumno WHERE codalumno = @CODALUMNO";
            // List<NpgsqlParameter> param = new List<NpgsqlParameter>();
            // param.Add(new NpgsqlParameter("CODALUMNO", parametro));
            // Instance.Con.ConsultaParametros(consulta, param);
        }

        public oObjeto SearchId(int id) {
            // Alumno retorna;
            // string consulta = "SELECT * FROM \"ISAUI\".alumno Where codalumno = "+id;
            // var temAlumno = new List<Alumno>();
            // temAlumno = (List<Alumno>)Instance.Con.consultaList<Alumno>(consulta);
            // retorna = temAlumno[0];
            // return retorna;
            return null;
        }
       
       
            
        
}