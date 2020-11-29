
using System;
using System.Collections.Generic;
public class CalificacionalumnoConexion<T> : ObjetoConexion<calificacionalumno>
{

    private static CalificacionalumnoConexion<T> instance;
    public static CalificacionalumnoConexion<T> Instance
    {
        get
        {
            if (instance == null)
                instance = new CalificacionalumnoConexion<T>(new calificacionalumno());
            return instance;
        }
    }
    private CalificacionalumnoConexion(calificacionalumno aux) : base(aux)
    {

    }
    public List<calificacionalumno> SearchExamenes(string[] arrayIds)
    {

        string d = "";
        for (int i = 1; i < arrayIds.Length; i++) { d += arrayIds[i] + ","; }
        d = d.Substring(0, d.Length - 1);
        string consulta = $"select calificacionalumno.* from calificacionalumno where " +
                            $" idexamen in ({d}) ";

        return (List<calificacionalumno>)Conexion.consultaList<calificacionalumno>(consulta);
    }

    public List<notarepo> SerchNotaAlumnos(int idalumno, int idmateria, int ciclolectivo=0)
    {
        var consultaSql = "";
        if (ciclolectivo==0){
            ciclolectivo = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        }

          consultaSql = "SELECT " +
                        "materia.nombre, " +
                        "examen.tipo, " +
                        "IFNULL(calificacionalumno.nota,0), " +
                        "examen.fecha, examen.id idexamen, IFNULL(calificacionalumno.id,0) idcalificacion " +
                        "FROM " +
                        "examen " +
                        "JOIN materia ON " +
                        "materia.Id = examen.Idmateria " +
                        "LEFT JOIN calificacionalumno ON " +
                        "examen.Id = calificacionalumno.Idexamen " +
                        $"AND calificacionalumno.Idalumno = {idalumno}  " +
                        "WHERE " +
                        $"examen.idmateria = {idmateria} " +
                        $"and examen.idciclolectivo = {ciclolectivo} ";

        return (List<notarepo>)Conexion.consultaList<notarepo>(consultaSql);
    }


}