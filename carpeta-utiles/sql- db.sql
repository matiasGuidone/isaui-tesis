	
CREATE TABLE `test_isaui`.`horasdia` ( `id` INT NOT NULL AUTO_INCREMENT , `hora` DATETIME NOT NULL , `numorden` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
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