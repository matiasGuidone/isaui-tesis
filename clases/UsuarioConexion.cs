
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
public class UsuarioConexion<T> : ObjetoConexion<usuario>
{

    private List<token> tokens = new List<token>();
    private static UsuarioConexion<T> instance;
    public static UsuarioConexion<T> Instance
    {
        get
        {
            if (instance == null)
                instance = new UsuarioConexion<T>(new usuario());
            return instance;
        }
    }
    private UsuarioConexion(usuario aux) : base(aux)
    {

    }

    public string generarToken(usuario user)
    {

        var token = this.tok();
        if (tokens.Count < 100)// cantidad de usuarios al mismo tiempo
        { //parametrizar la variable de cantidad de sesiones para regular si se cortan mucho
            tokens.Add(new token(token, System.DateTime.Now, user.Id));
        }
        else
        {
            var fe = System.DateTime.Now;
            var indice = 0;
            for (int i = 0; i < tokens.Count; i++)
            {
                if (tokens[i].fechahora < fe) { fe = tokens[i].fechahora; indice = i; }
            }
            tokens[indice] = new token(token, System.DateTime.Now,user.Id);
        }
        //string consulta = $"update usuario set token = '{token}' where id = {user.Id} ";
        //Conexion.ConsultaParametros(consulta, null);
        return token;
    }

    private string tok()
    {
        //int longitud = 15;
        Guid miGuid = Guid.NewGuid();
        string token = Convert.ToBase64String(miGuid.ToByteArray());
        token = token.Replace("=", "").Replace("+", "").Replace("\\", "").Replace("/", "").Replace("-", "");
        return token;
    }
    public bool getUserToken(string token)
    {
        foreach (var n in tokens)
        {
            if (n.tok.Equals(token))
            { return true; }
        }
        return false;
    }
    public int getIdUserToken(string token)
    {
        foreach (var n in tokens)
        {
            if (n.tok.Equals(token))
            { return n.idusuario; }
        }
        return 0;
    }


    //Este metodo encripta / desencripta la cadena de claves para que no se vea en la base de datos
    private String enc_des(String clave, char tipo)
    {
        if (tipo == 'e')
        {
            var IV = ASCIIEncoding.ASCII.GetBytes("1s4uites"); //La clave debe ser de 8 caracteres
            var EncryptionKey = Convert.FromBase64String("naAr66AWvyVzxc8M05mDCZf9qYvShUT8");

            var buffer = Encoding.UTF8.GetBytes(clave);
            var des = new TripleDESCryptoServiceProvider();
            des.Key = EncryptionKey;
            des.IV = IV;

            return Convert.ToBase64String(des.CreateEncryptor().TransformFinalBlock(buffer, 0, buffer.Length));
        }
        if (tipo == 'd')
        {

            var IV = ASCIIEncoding.ASCII.GetBytes("1s4uites"); //La clave debe ser de 8 caracteres
            var EncryptionKey = Convert.FromBase64String("naAr66AWvyVzxc8M05mDCZf9qYvShUT8"); //No se puede alterar la cantidad de caracteres pero si la clave

            var buffer = Convert.FromBase64String(clave);
            var des = new TripleDESCryptoServiceProvider();
            des.Key = EncryptionKey;
            des.IV = IV;
            return Encoding.UTF8.GetString(des.CreateDecryptor().TransformFinalBlock(buffer, 0, buffer.Length));

        }
        return "";
    }
    public string datosUsuario(int id = default(Int32), string token = null, string roles = null)
    {
        if (token == null && roles == null)
        {
            var rol = "";
            var Tabla = this.Conexion.consultaDataTable($"SELECT roles.*, usuario.estilo, usuario.foto, usuario.nombre as 'nombreusuario' FROM usuario left JOIN rolesusuario on usuario.Id = rolesusuario.Idusuario JOIN roles on roles.Id = rolesusuario.Idroles  WHERE usuario.id = {id} ").Tables[0];
            if (Tabla.Rows.Count == 1 && Tabla.Rows[0]["nombre"].ToString() == ""){
                rol = $" \"nombrerol\" : \"usuario\" , \"idroles\" : \"\" , \"foto\" : \"{Tabla.Rows[0]["foto"].ToString()}\" , \"estilo\" : \"{Tabla.Rows[0]["estilo"].ToString()}\" , \"nombreusuario\" : \"{Tabla.Rows[0]["nombreusuario"].ToString()}\" ";
                return " { " + rol + " } ";
            }
            else if (Tabla.Rows.Count == 1)
            {
                rol = $" \"nombrerol\" : \"{Tabla.Rows[0]["nombre"].ToString()}\" , \"idroles\" : \"{Tabla.Rows[0]["id"].ToString()}\" , \"foto\" : \"{Tabla.Rows[0]["foto"].ToString()}\" , \"estilo\" : \"{Tabla.Rows[0]["estilo"].ToString()}\" , \"nombreusuario\" : \"{Tabla.Rows[0]["nombreusuario"].ToString()}\" ";
                if (Tabla.Rows[0]["nombre"].ToString().ToUpper().Equals("DOCENTE"))
                {
                    try
                    {
                        Tabla = this.Conexion.consultaDataTable($"SELECT docente.* FROM docente where docente.idusuario = {id} ").Tables[0];
                        if (Tabla.Rows.Count > 0)
                        {
                            rol += $", \"nombreapellido\" : \" {Tabla.Rows[0]["nombre"]}, {Tabla.Rows[0]["apellido"]}  \", \"id\": {Tabla.Rows[0]["id"]}, \"legajo\" : {Tabla.Rows[0]["legajo"]}";
                        }
                    }
                    catch (Exception e) { }
                }
                else if (Tabla.Rows[0]["nombre"].ToString().ToUpper().Equals("ESTUDIANTE"))
                {
                    try
                    {
                        Tabla = this.Conexion.consultaDataTable($"SELECT estudiante.* FROM estudiante where estudiante.idusuario = {id} ").Tables[0];
                        if (Tabla.Rows.Count > 0)
                        {
                            rol += $", \"nombreapellido\" : \" {Tabla.Rows[0]["nombre"]}, {Tabla.Rows[0]["apellido"]}  \", \"id\": {Tabla.Rows[0]["id"]}, \"legajo\" : {Tabla.Rows[0]["legajo"]}";
                        }
                    }
                    catch (Exception e) { }
                }
                return " { " + rol + " } ";
            }

            else
            {
                rol = $" \"nombrerol\" : [ ";
                foreach (DataRow r in Tabla.Rows)
                {
                    rol += $"\"{r["nombre"].ToString()}\" ,";
                }
                rol = rol.Substring(0, rol.Length - 1) + $" ] ";
                return " { " + rol + " } ***multiple***";
            }
        }
        else
        {
            var rol = "";

            DataTable Tabla;
            Tabla = this.Conexion.consultaDataTable($"SELECT roles.*, usuario.estilo, usuario.foto, usuario.nombre as 'nombreusuario' FROM usuario JOIN rolesusuario on usuario.Id = rolesusuario.Idusuario JOIN roles on roles.Id = rolesusuario.Idroles  WHERE roles.nombre LIKE '{roles}' and usuario.id = {id}  ").Tables[0];
            rol = $" \"nombrerol\" : \"{Tabla.Rows[0]["nombre"].ToString()}\" , \"idroles\" : \"{Tabla.Rows[0]["id"].ToString()}\"  , \"foto\" : \"{Tabla.Rows[0]["foto"].ToString()}\" , \"estilo\" : \"{Tabla.Rows[0]["estilo"].ToString()}\" , \"nombreusuario\" : \"{Tabla.Rows[0]["nombreusuario"].ToString()}\" ";
            if (roles.ToUpper().Equals("DOCENTE"))
            {
                try
                {
                    Tabla = this.Conexion.consultaDataTable($"SELECT docente.* FROM docente where docente.idusuario = {id} ").Tables[0];
                    if (Tabla.Rows.Count > 0)
                    {
                        rol += $", \"nombreapellido\" : \" {Tabla.Rows[0]["nombre"]}, {Tabla.Rows[0]["apellido"]}  \", \"id\": {Tabla.Rows[0]["id"]}, \"legajo\" : {Tabla.Rows[0]["legajo"]}";
                    }
                }
                catch (Exception e) { }
            }
            else if (roles.ToUpper().Equals("ESTUDIANTE"))
            {
                try
                {
                    Tabla = this.Conexion.consultaDataTable($"SELECT estudiante.* FROM estudiante where estudiante.idusuario = {id} ").Tables[0];
                    if (Tabla.Rows.Count > 0)
                    {
                        rol += $", \"nombreapellido\" : \" {Tabla.Rows[0]["nombre"]}, {Tabla.Rows[0]["apellido"]}  \", \"id\": {Tabla.Rows[0]["id"]}, \"legajo\" : {Tabla.Rows[0]["legajo"]}";
                    }
                }
                catch (Exception e) { }
            }

            return " { " + rol + " } ";
        }

    }
    public bool setFoto(int id, string foto){
        string consulta = " UPDATE usuario set foto = ?foto where id = ?id ";
        var parametros = new List<MySqlParameter>();
        parametros.Add(new MySqlParameter("id",id));
        parametros.Add(new MySqlParameter("foto",foto));
        return this.Conexion.ConsultaParametros(consulta, parametros);
    }
    public bool setEstilo(int id, string stl){
        string consulta = " UPDATE usuario set estilo = ?estilo where id = ?id ";
        var parametros = new List<MySqlParameter>();
        parametros.Add(new MySqlParameter("id",id));
        parametros.Add(new MySqlParameter("estilo",stl));
        return this.Conexion.ConsultaParametros(consulta, parametros);
    }
}