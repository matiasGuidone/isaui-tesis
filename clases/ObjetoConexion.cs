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
         public oObjeto tipo;
         public ObjetoConexion(oObjeto t){
            this.tipo = t;
            this.Conexion= new Conexion();
         }
       //['columna','valor','columna','valor','columna','valor']
       //concatenar = concatenar una condición mas " AND Columna = 1 AND Columna2 = 2 OR Columna3 = 3"
        public List<T> SearchAll( string[] parametros = null, string concatenar = null )
        {
         
            if (parametros == null || parametros.Length<2){
        	string consulta = $"SELECT * FROM {tipo.GetType()} ORDER BY 1 ASC";
             
            return (List<T>)Conexion.consultaList<T>(consulta);}
            else{
                IList<PropertyInfo> props = new List<PropertyInfo>(this.tipo.GetType().GetProperties());
                List<MySqlParameter> param = new List<MySqlParameter>();
                String consulta = $"SELECT * FROM {this.tipo.GetType()} ";
                var i = 0;
                
                for (int j =0;j < parametros.Length;j++){
                    if (parametros[j] != null){consulta += " WHERE 1 "; break;}
                }
                foreach (PropertyInfo prop in props)
                {

                    if (prop.Name != "Id"  && parametros[i].ToLower() == prop.Name.ToLower()){
             
                        i++;
                        if (prop.PropertyType.Equals(typeof(System.Int32))||prop.PropertyType.Equals(typeof(int))){
                            consulta += $" AND {prop.Name} = {parametros[i]} ";
                        }
                        else if(prop.PropertyType.Equals(typeof(System.String))||prop.PropertyType.Equals(typeof(string))){consulta += $" AND {prop.Name} LIKE '%{parametros[i]}%' ";}
                        else if(prop.PropertyType.Equals(typeof(System.DateTime))){consulta += $" AND {prop.Name} = '{parametros[i]}' ";}
  
                       i++;
                      if(i>=parametros.Length){break;}
                    }
                      
                }
                if(concatenar != null){
                    consulta += concatenar;
                }
                return (List<T>)Conexion.consultaList<T>(consulta);
            }
   
        }
       

        public void Insert(oObjeto objeto)
        {	
        
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
                    if (prop.Name != "Id"){
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
                    if (prop.Name != "Id"){
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
         public void Delete(int Id, oObjeto param = null, string filtro = null, string valor = null)
        {
            //si el objeto no es null se elimina ese objeto
            if(filtro != null && filtro != "" && valor != null && valor != ""){
                String consulta = $"DELETE FROM {this.tipo.GetType()} WHERE {filtro} = ?{filtro}";
                List<MySqlParameter> parametro = new List<MySqlParameter>();
                parametro.Add(new MySqlParameter(filtro, valor));
                Conexion.ConsultaParametros(consulta, parametro);
            }
            else if (param != null){
                String consulta = $"DELETE FROM {this.tipo.GetType()} WHERE Id = ?Id";
                List<MySqlParameter> parametro = new List<MySqlParameter>();
                parametro.Add(new MySqlParameter("Id", param.Id));
                Conexion.ConsultaParametros(consulta, parametro);
            }
            else {
                //si el objeto es nulo se elimina por ID
                String consulta = $"DELETE FROM {this.tipo.GetType()} WHERE Id = ?Id";
                List<MySqlParameter> parametro = new List<MySqlParameter>();
                parametro.Add(new MySqlParameter("Id", Id));
                Conexion.ConsultaParametros(consulta, parametro);
            }
           
        }

        public T SearchId(int Id) {
            // oObjeto retorna;
             string consulta = $"SELECT * FROM {this.tipo.GetType()} Where ID = {Id}";
             var temp = new List<T>();
             temp = (List<T>)Conexion.consultaList<T>(consulta);
             try{
             return temp[0];}catch(System.ArgumentOutOfRangeException e){ return default(T); }
            // return retorna;
            //return null;
        }
             
       
            
        
}