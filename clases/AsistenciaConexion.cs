 
 using System;
using System.Collections.Generic;
    public class AsistenciaConexion<T> : ObjetoConexion<asistencia>
    {
       
        private static AsistenciaConexion<T> instance;
         public static AsistenciaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new AsistenciaConexion<T>(new asistencia());
                return instance;
            }
        } 
        private AsistenciaConexion(asistencia aux): base(aux){ 
            
        }
        public List<asistencia> SearchPorMateria( Int32 idmateria )
        {  
            string consulta =   $"select asistencia.* from asistencia where "+
                                $"asistencia.idhoramateria in (select id from"+
                                $" horasmateria where idmateria = {idmateria})"+
                                $" and asistencia.fecha > CURDATE() - INTERVAL 7 DAY";
            
            return (List<asistencia>)Conexion.consultaList<asistencia>(consulta);
        }

        public List<asistenciarepo> ReporteAsistencias( DateTime fechaDesde = default(DateTime),
                                                DateTime fechaHasta = default(DateTime),
                                                Int32 idcurso = default(Int32), 
                                                 Int32 idmateria = default(Int32),
                                                string nombreapellido = null,
                                                Boolean totales = false){
            var alumno = "";
            var consulta = "";
            if(fechaDesde == default(DateTime)){fechaDesde = System.DateTime.Now.AddDays(-10); }
            if(fechaHasta == default(DateTime)){fechaHasta = System.DateTime.Now; }
            if(totales){alumno = "alumno.Id,"; 
                        consulta += "SELECT T3.Alumno, 'Todas' as Materia, Sum(T3.ModulosPresente) as ModulosPresente, Sum(T3.CantidadModulos) as CantidadModulos from ( ";}

            consulta += $"select {alumno} concat(alumno.apellido,', ',alumno.nombre) as Alumno,"+
                $"materia.nombre as Materia, count(asistencia.Id) as ModulosPresente , "+
                $"modulos as CantidadModulos from asistencia "+
                $"join horasmateria on asistencia.idhoramateria = horasmateria.id "+
                $"JOIN alumno on asistencia.idalumno = alumno.id "+
                $"join materia on horasmateria.idmateria = materia.Id "+
                $"JOIN (SELECT horasmateria.idmateria, COUNT(horasmateria.id)*Cnt AS modulos "+
                $"FROM horasmateria,(SELECT DAYOFWEEK(DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY))-1 as DIA, " +
                $"COUNT(DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY)) as Cnt "+
                $"FROM ( SELECT @row := @row+1 AS row FROM INFORMATION_SCHEMA.COLUMNS, "+
                $"(SELECT @row := 0) t ) T WHERE DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY) "+
                $"BETWEEN '{fechaDesde.ToString("yyyy-MM-dd")}' AND '{fechaHasta.ToString("yyyy-MM-dd")}' GROUP BY DAYOFWEEK(DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY))) T1 "+
                $"WHERE horasmateria.activo = 1 and horasmateria.numsemana = T1.DIA group by idmateria ) T2 "+
                $"ON materia.Id = T2.idmateria "+
                $"WHERE asistencia.fecha BETWEEN '{fechaDesde.ToString("yyyy-MM-dd")}' and '{fechaHasta.ToString("yyyy-MM-dd")}' ";
           
            if (nombreapellido != null){consulta += $" and concat(alumno.apellido,', ',alumno.nombre) LIKE '%{nombreapellido}%' "; }
            if (idmateria !=  default(Int32)){consulta += $" and materia.Id = {idmateria} "; }
            if (idcurso != default(Int32)){consulta += $" and alumno.Id IN "+ 
                                                    $"(select alumno.Id from alumno where "+
                                                    $"alumno.id in (select idalumno from"+
                                                    $" (select count(id) as materias fro"+
                                                    $"m materia where idcurso = {idcurso}"+
                                                    $") as T1 CROSS JOIN (select idalumno"+
                                                    $", count(idmateria) as materias_alumno"+
                                                    $" from alumnomateria join materia on "+
                                                    $"alumnomateria.Idmateria = materia.id "+
                                                    $"where idciclolectivo = (select max(id) "+
                                                    $"from ciclolectivo) and idcurso = {idcurso}"+
                                                    $" group by idalumno) as T2 where T1.materias"+
                                                    " = T2.materias_alumno))";}
                  
            consulta +=" group by asistencia.idalumno, materia.Id ";
            if(totales){consulta += ") T3 group by T3.Id ";}
            return (List<asistenciarepo>)Conexion.consultaList<asistenciarepo>(consulta);
        }
    }