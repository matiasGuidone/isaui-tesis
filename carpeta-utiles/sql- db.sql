	
CREATE TABLE `test_isaui`.`horasdia` ( `id` INT NOT NULL AUTO_INCREMENT , `hora` VARCHAR(11) NOT NULL , `numorden` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
CREATE TABLE `test_isaui`.`horasmateria` ( `id` INT NOT NULL AUTO_INCREMENT , `numsemana` INT NOT NULL , `idmateria` INT NOT NULL , `idhoradia` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
CREATE TABLE `test_isaui`.`asistencia` ( `id` INT NOT NULL AUTO_INCREMENT , `idalumno` INT NOT NULL , `iddocente` INT NOT NULL , `idhoramateria` INT NOT NULL , `fecha` DATE NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `horasmateria`
  ADD CONSTRAINT `fk_horas_materia` FOREIGN KEY (`idmateria`) REFERENCES `materia` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
  
ALTER TABLE `asistencia`
	ADD CONSTRAINT `fk_asistencia_alumno` FOREIGN KEY (`idalumno`) REFERENCES `alumno` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	ADD CONSTRAINT `fk_asistencia_docente` FOREIGN KEY (`iddocente`) REFERENCES `docente` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  	ADD CONSTRAINT `fk_asistencia_horasmateria` FOREIGN KEY (`idhoramateria`) REFERENCES `horasmateria` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `horasdia` CHANGE `hora` `hora` VARCHAR(10) NOT NULL;


ALTER TABLE `asistencia` DROP INDEX `fk_asistencia_docente`;
 
ALTER TABLE `usuario` ADD `token` VARCHAR(32) NULL AFTER `estado`;
 
ALTER TABLE `menu` ADD `idroles` INT NOT NULL AFTER `tipo`;

ALTER TABLE `asistencia` ADD `activo` INT NOT NULL AFTER `fecha`;

ALTER TABLE `localidad` ADD `codpostal` INT NOT NULL AFTER `Idprovincia`;

ALTER TABLE `docente` CHANGE `Idusuario` `Idusuario` INT(11) NULL;

ALTER TABLE `docente` DROP INDEX `fk_Docentes_Domicilios1`;

ALTER TABLE `calificacionalumno` CHANGE `Idmateria` `Idciclolectivo` INT(11) NOT NULL;

ALTER TABLE `calificacionalumno` ADD `Id` INT NULL AFTER `Idexamen`;

ALTER TABLE `examen` ADD `Idciclolectivo` INT NULL AFTER `tipo`;


CREATE TABLE `test_isaui`.`calificacionalumno` ( `Idalumno` INT NOT NULL , `Nota` INT NOT NULL , `Idexamen` INT NOT NULL ) ENGINE = InnoDB;

ALTER TABLE `calificacionalumno` ADD `Id` INT NOT NULL AUTO_INCREMENT AFTER `Idexamen`, ADD PRIMARY KEY (`Id`);

CREATE TABLE `test_isaui`.`evento` ( `Id` INT(11) NOT NULL AUTO_INCREMENT , `nombre` VARCHAR(20) NOT NULL , `fechainicio` DATE NOT NULL , `fechafin` DATE NOT NULL , `tipo` INT NOT NULL , `Idcurso` INT NOT NULL , PRIMARY KEY (`Id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

ALTER TABLE `mensaje` CHANGE `fecha` `fechainicio` DATE NULL DEFAULT NULL;
ALTER TABLE `mensaje` ADD `fechafin` DATE NOT NULL AFTER `mensaje`, ADD `titulo` VARCHAR(10) NOT NULL AFTER `fechafin`, ADD `Idcurso` INT NOT NULL AFTER `titulo`;
ALTER TABLE `evento` CHANGE `tipo` `tipo` VARCHAR(11) NOT NULL;

ALTER TABLE `mensaje` CHANGE `mensaje` `mensaje` VARCHAR(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;
ALTER TABLE `mensaje` CHANGE `Idcurso` `Idmateria` INT(11) NOT NULL;
ALTER TABLE `mensaje` ADD `Iddocente` INT(11) NOT NULL AFTER `Idmateria`;


ALTER TABLE `curriculum` ADD `Idusuario` INT NOT NULL AFTER `tipodoc`;
/* 17/10 */
ALTER TABLE `curriculumconvocatoria` ADD `id` INT NULL AFTER `prioridad`;
/* 19/10 */
ALTER TABLE `curriculumconvocatoria` CHANGE `puntaje` `puntaje` DECIMAL(11) NULL DEFAULT NULL;
>>>>>>> 409a1c870a1b33b7d87710e0bd4eee6ac2c7af5c
