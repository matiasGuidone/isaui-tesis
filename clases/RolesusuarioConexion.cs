using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

    public class RolesusuarioConexion<T> : ObjetoConexion<rolesusuario>
    {
       
        private static RolesusuarioConexion<T> instance;
         public static RolesusuarioConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new RolesusuarioConexion<T>(new rolesusuario());
                return instance;
            }
        } 
        private RolesusuarioConexion(rolesusuario aux): base(aux){ 
            
        }
        public void addRolCv(int idusuario){
            var consulta = "INSERT INTO rolesusuario (idroles, idusuario, descripcion)"+
                           $" VALUES ((select id from roles where nombre = 'Curriculum'), ?idusuario ,'inserción automática')";

            List<MySqlParameter> param = new List<MySqlParameter>();
            param.Add(new MySqlParameter ("idusuario" ,idusuario )); 
            Conexion.ConsultaParametros(consulta, param);

        }
    }