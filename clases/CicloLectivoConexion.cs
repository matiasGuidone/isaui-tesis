using System.Collections.Generic;
 public class CicloLectivoConexion<T> : ObjetoConexion<ciclolectivo>
    {
       
        private static CicloLectivoConexion<T> instance;
         public static CicloLectivoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CicloLectivoConexion<T>(new ciclolectivo());
                return instance;
            }
        } 
        private CicloLectivoConexion(ciclolectivo aux): base(aux){ 
            
        }
        public ciclolectivo getCicloLectivo() {
            // oObjeto retorna;
             string consulta = $"SELECT * FROM ciclolectivo where ID = (SELECT MAX(ID) FROM ciclolectivo)";
             var temp = new List<ciclolectivo>();
             temp = (List<ciclolectivo>)Conexion.consultaList<ciclolectivo>(consulta);
             try{
             return temp[0];}catch(System.ArgumentOutOfRangeException e){ return default(ciclolectivo); }
            // return retorna;
            //return null;
        }
        
    }