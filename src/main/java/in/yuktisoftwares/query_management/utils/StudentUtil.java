package in.yuktisoftwares.query_management.utils;

import in.yuktisoftwares.query_management.entity.StudentEntity;
import in.yuktisoftwares.query_management.model.Student;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class StudentUtil {
    public static Student entityToModel(StudentEntity entity) {
        if(entity == null){
            return null;
        }
        log.info("Student entity transform to model: {}",entity);
        return Student.builder().studentId(entity.getId()).name(entity.getName()).emailId(entity.getEmailId())
                .mobile(entity.getMobile()).address(entity.getAddress())
                .branch(entity.getBranch()).college(entity.getCollege())
                .degree(entity.getDegree()).passingYear(entity.getPassingYear())
                .semester(entity.getSemester())
                .visitPurpose(entity.getVisitPurpose()).build();
    }
    public static StudentEntity modelToEntity(Student model) {
        log.info("Student model before transformation: {}",model);
        if(model == null){
            return null;
        }else{
            log.info("Student model transform to entity: {}",model);
            return StudentEntity.builder().id(model.getStudentId()).address(model.getAddress())
                    .branch(model.getBranch()).college(model.getCollege()).degree(model.getDegree())
                    .emailId(model.getEmailId()).name(model.getName()).passingYear(model.getPassingYear())
                    .semester(model.getSemester()).mobile(model.getMobile())
                    .visitPurpose(model.getVisitPurpose()).build();
        }
    }
}
