 
 using System;
    public class MenuConexion<T> : ObjetoConexion<menu>
    {
       
        private static MenuConexion<T> instance;
         public static MenuConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new MenuConexion<T>(new menu());
                return instance;
            }
        } 
        private MenuConexion(menu aux): base(aux){ 
            
        }
         public string getComponentsByUser(Int32 idusuario){

            var consulta = $"select GROUP_CONCAT( CONCAT"+
                            $"(\"'\",menu.componente,\"'\")) "+
                            $"as datos from menu join rol"+
                            $"es on menu.idroles = roles."+
                            $"id join rolesusuario on rol"+
                            $"es.Id = rolesusuario.Idrole"+
                            $"s where rolesusuario.Idusuario ={idusuario}";
            
            var result = Conexion.consultaDataTable(consulta);
            if (result.Tables.Count>0){return " \"componentes\" : [ "+ result.Tables[0].Rows[0]["datos"].ToString().Replace("'","\"")+" ] ";}
            else return "";
            
        }
    }
 