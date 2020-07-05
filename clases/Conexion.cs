 ﻿/*
 * Created by SharpDevelop.
 * User: matias
 * Date: 02/04/2020
 * Time: 1:33
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Data;
//using System.Data.SqlClient;
using System.Xml;
using System.Collections.Generic;
using MySql.Data.MySqlClient;


	/// <summary>
	/// Description of Conexion.
	/// </summary>
	public class Conexion
	{ 
		private MySqlConnection conn;
		
		

        private static string cadena()
        {
           /*  XmlTextReader reader = new XmlTextReader("./config_.xml");
            while (reader.Read())
            {
                if (reader.NodeType == XmlNodeType.Element && reader.Name == "postgresql")
                {
                    reader.Read();
                    return reader.Value;
                }

            }
            return ""; */
			return "datasource=127.0.0.1;port=3306;username=root;password=;database=test;";
        }

		public Conexion()
		{
			conn =new MySqlConnection (cadena());
	
		}
		
		
		public DataSet consultaDataTable(String consulta ){
			MySqlCommand comando= new MySqlCommand ();
			comando.CommandText =consulta;
			comando.Connection = this.conn;
			conn.Open();
			MySqlDataAdapter Da = new MySqlDataAdapter ();
			Da.SelectCommand =comando ;
			DataSet oDs =new DataSet ();
			if(oDs != null){
			 Da.Fill(oDs);
			 conn.Close();return oDs;}
			else return null;
			
			
		}
		public IEnumerable<T> consultaList<T>(String consulta ){
			 List<T> items = new List<T>();
			 var dataTable = consultaDataTable (consulta).Tables[0]; 
 		   foreach (var row in dataTable.Rows)
            {
                T item = (T)Activator.CreateInstance(typeof(T), row);
                items.Add(item);

            }
          return items;
			
		}

		//para un insert o un update o un delete
		public Boolean ConsultaParametros(String consulta, List<MySqlParameter>  param){
			MySqlCommand comando= new MySqlCommand ();
			comando.CommandText =consulta;
			comando.Connection = this.conn;
			conn.Open();
			foreach(var par in param){
				comando.Parameters.Add(par);}
			comando .ExecuteNonQuery();
			conn.Close ();
			return true;
			
		}
	
		
	}

