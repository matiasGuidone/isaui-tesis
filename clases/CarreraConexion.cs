
using System.Collections.Generic;


    public class CarreraConexion<T> : ObjetoConexion<carrera>
    {
       
        private static CarreraConexion<T> instance;
         public static CarreraConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CarreraConexion<T>(new carrera());
                return instance;
            }
        } 
        private CarreraConexion(oObjeto aux): base(aux){ 
            
        }  

        /* public List<T> serchName(string dato)
        {
            string consulta = $"SELECT * FROM {this.tipo.GetType()}";
            if(dato!=null)
            {
                consulta+=$"WHERE nombre LIKE '%{dato}%' ";
            }
             return (List<T>)Conexion.consultaList<T>(consulta);
             
        }   */
    }
 