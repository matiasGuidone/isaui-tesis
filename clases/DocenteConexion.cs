
using System.Collections.Generic;


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
    }
 