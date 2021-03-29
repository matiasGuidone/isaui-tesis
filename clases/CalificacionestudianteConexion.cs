
using System;
using System.Collections.Generic;
public class CalificacionestudianteConexion<T> : ObjetoConexion<calificacionestudiante>
{

    private static CalificacionestudianteConexion<T> instance;
    public static CalificacionestudianteConexion<T> Instance
    {
        get
        {
            if (instance == null)
                instance = new CalificacionestudianteConexion<T>(new calificacionestudiante());
            return instance;
        }
    }
    private CalificacionestudianteConexion(calificacionestudiante aux) : base(aux)
    {

    }
    public List<calificacionestudiante> SearchExamenes(string[] arrayIds)
    {

        string d = "";
        for (int i = 1; i < arrayIds.Length; i++) { d += arrayIds[i] + ","; }
        d = d.Substring(0, d.Length - 1);
        string consulta = $"select calificacionestudiante.* from calificacionestudiante where " +
                            $" idexamen in ({d}) ";

        return (List<calificacionestudiante>)Conexion.consultaList<calificacionestudiante>(consulta);
    }

    public List<notarepo> SerchNotaestudiantes(int idestudiante, int idmateria, int ciclolectivo=0)
    {
        var consultaSql = "";
        if (ciclolectivo==0){
            ciclolectivo = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        }

          consultaSql = "SELECT " +
                        "materia.nombre, " +
                        "examen.tipo, " +
                        "IFNULL(calificacionestudiante.nota,0), " +
                        "examen.fecha, examen.id idexamen, IFNULL(calificacionestudiante.id,0)"+
                        " idcalificacion, estudiantemateria.estadonotas as condicion, estudiantemateria.estadoasistencias as condiciona  " +
                        "FROM " +
                        "examen " +
                        "JOIN materia ON " +
                        "materia.Id = examen.Idmateria join estudiantemateria on estudiantemateria.idmateria = " + 
                        $"materia.id and examen.idciclolectivo = estudiantemateria.idciclolectivo and estudiantemateria.idestudiante = {idestudiante} " +
                        "LEFT JOIN calificacionestudiante ON " +
                        "examen.Id = calificacionestudiante.Idexamen " +
                        $"AND calificacionestudiante.Idestudiante = {idestudiante}  " +
                        "WHERE " +
                        $"examen.idmateria = {idmateria} " +
                        $"and examen.idciclolectivo = {ciclolectivo} ";

        return (List<notarepo>)Conexion.consultaList<notarepo>(consultaSql);
    }


}