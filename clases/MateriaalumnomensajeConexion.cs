
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Data;
using System.Text;
using System.Threading.Tasks; 
using MySql.Data.MySqlClient;
    public class estudiantemensajeConexion<T> : ObjetoConexion<estudiantemensaje>
    {
       
        private static estudiantemensajeConexion<T> instance;
         public static estudiantemensajeConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new estudiantemensajeConexion<T>(new estudiantemensaje());
                return instance;
            }
        } 
        private estudiantemensajeConexion(estudiantemensaje aux): base(aux){ 
            
        }
        public List<estudiantemensaje> getmensajes(string id){
           
         return (List<estudiantemensaje>)this.Conexion
            .consultaList<estudiantemensaje>($"SELECT mensaje.mensaje, materia.nombre, mensaje.Id as 'idmensaje', " +
                                                    " mensaje.titulo, case when estudiantemensaje.Idmensaje"+
                                                    " is null then '0' else '1' end as 'estado' , estudiante.id as "+
                                                    "'idestudiante' FROM(((estudiante INNER JOIN estudiantemateria ON"+
                                                    " estudiante.Id = estudiantemateria.Idestudiante) INNER JOIN mensaje"+
                                                    " on mensaje.Idmateria =estudiantemateria.Idmateria)INNER JOIN materia"+
                                                    " on materia.Id =estudiantemateria.Idmateria) left join "+
                                                    "estudiantemensaje on estudiante.Id = "+
                                                    "estudiantemensaje.Idestudiante and mensaje.Id = "+
                                                    $"estudiantemensaje.Idmensaje WHERE estudiante.id = {id} "+
                                                    "AND NOW() <= mensaje.fechafin and NOW() >= mensaje.fechainicio");
         
        }
        public Boolean InsertAlter(estudiantemensaje aux){
            var consulta = $"SELECT * from estudiantemensaje  where Idmensaje = {aux.Id} and Idestudiante = {aux.Idestudiante}";
            if(Conexion.consultaDataTable(consulta).Tables[0].Rows.Count == 0){
             consulta = $"INSERT INTO estudiantemensaje (Idmensaje, Idestudiante) VALUES ({aux.Id},{aux.Idestudiante})";
            return Conexion.ConsultaParametros(consulta);}
            else return false;
            //return true;
        }
        
    }