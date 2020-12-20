/*
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
        XmlTextReader reader = new XmlTextReader("./config.xml");
         while (reader.Read())
         {
             if (reader.NodeType == XmlNodeType.Element && reader.Name == "mariadb")
             {
                 reader.Read();
                 return reader.Value;
             }

         }
         return "";  
        //return "datasource=localhost;port=3306;username=root;password=;database=test_isaui;Allow User Variables=true;";
    }

    public Conexion()
    {
        conn = new MySqlConnection(cadena());

    }


    public  DataSet consultaDataTable(String consulta)
    {
        try
        {
            MySqlCommand comando = new MySqlCommand();
            comando.CommandText = consulta;
            comando.Connection = this.conn;
            conn.Open();
            MySqlDataAdapter Da = new MySqlDataAdapter();
            Da.SelectCommand = comando;
            DataSet oDs = new DataSet();
            if (oDs != null)
            {
                Da.Fill(oDs);
                conn.Close(); return oDs;
            }
            else return null;
        }
        catch (System.InvalidOperationException e) { conn.Close(); return null; }
        //catch (MySql.Data.MySqlClient.MySqlException e){conn.Close(); return null;}

    }
    public IEnumerable<T> consultaList<T>(String consulta)
    {
        List<T> items = new List<T>();
        try{ var dataTable = consultaDataTable(consulta).Tables[0];
        foreach (var row in dataTable.Rows)
        {
            T item = (T)Activator.CreateInstance(typeof(T), row);
            items.Add(item);

        }
        return items;
        }catch(System.NullReferenceException e){return null;}

    }

    //para un insert o un update o un delete
    public Boolean ConsultaParametros(String consulta, List<MySqlParameter> param =null)
    {
        try{
        MySqlCommand comando = new MySqlCommand();
        comando.CommandText = consulta;
        comando.Connection = this.conn;
        conn.Open();
        if(param != null){
            foreach (var par in param)
            {
                comando.Parameters.Add(par);
            }
        }
        comando.ExecuteNonQuery();
        conn.Close();
        return true;
        }
        catch (System.InvalidOperationException e) { conn.Close(); return false; }
        catch (MySql.Data.MySqlClient.MySqlException er) 
        { if (er.ToString().Contains("Duplicate entry")) {conn.Close(); return false;} }
        //catch (MySql.Data.MySqlClient.MySqlException e) { conn.Close(); return false; }
        return false;
    }


}

