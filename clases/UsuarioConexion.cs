
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Data;
using System.Text;
public class UsuarioConexion<T> : ObjetoConexion<usuario>
{

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
        string consulta = $"update usuario set token = '{token}' where id = {user.Id} ";
        Conexion.ConsultaParametros(consulta, null);
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
    public List<usuario> getUserToken(string token)
    {   
        string consulta = $"select usuario.id, usuario.nombre, usuario.codigo, usuario.codigoayuda, usuario.correo, usuario.estado from usuario where usuario.token LIKE '{token}' and usuario.estado = 0 ";
        var lista = Conexion.consultaList<usuario>(consulta);
        return (List<usuario>)lista;
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

}