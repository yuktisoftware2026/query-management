package in.yuktisoftwares.query_management.service;

import in.yuktisoftwares.query_management.entity.StudentEntity;
import in.yuktisoftwares.query_management.model.Student;
import in.yuktisoftwares.query_management.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class StudentServiceImpl implements StudentService{

    private  final StudentRepository studentRepository;
    @Override
    public List<Student> getStudents() {
        List<StudentEntity> studentEntities = (List<StudentEntity>) studentRepository.findAll();

        ArrayList<Student> students = new ArrayList<Student>();
        for (StudentEntity entity : studentEntities) {
            StudentEntity studentEntity = (StudentEntity) entity;

            Student student = new Student();
            student.setStudentId(studentEntity.getId());
            student.setName(studentEntity.getName());
            student.setEmailId(studentEntity.getEmailId());
            student.setMobile(studentEntity.getMobile());
            students.add(student);
        }
        return students;
    }

    @Override
    public Student saveStudent(Student student) {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setId(student.getStudentId());
        studentEntity.setName(student.getName());
        studentEntity.setEmailId(student.getEmailId());
        studentEntity.setMobile(student.getMobile());

        StudentEntity savedStudentEntity = studentRepository.save(studentEntity);

        Student savedStudent = new Student();
        savedStudent.setStudentId(savedStudentEntity.getId());
        savedStudent.setName(savedStudentEntity.getName());
        savedStudent.setEmailId(savedStudentEntity.getEmailId());
        savedStudent.setMobile(savedStudentEntity.getMobile());

        return savedStudent;
    }

    @Override
    public Student updateStudent(Integer id, Student student) {

        Optional<StudentEntity> optionalStudent = studentRepository.findById(id);
        if(optionalStudent.isPresent()){
            StudentEntity existingStudentEntity = optionalStudent.get();
            existingStudentEntity.setName(student.getName());
            existingStudentEntity.setEmailId(student.getEmailId());
            existingStudentEntity.setMobile(student.getMobile());
            StudentEntity savedStudentEntity = studentRepository.save(existingStudentEntity);
            Student savedStudent = new Student();
            savedStudent.setStudentId(savedStudentEntity.getId());
            savedStudent.setName(savedStudentEntity.getName());
            savedStudent.setEmailId(savedStudentEntity.getEmailId());
            savedStudent.setMobile(savedStudentEntity.getMobile());
            return savedStudent;
        }else {
            // Handle Student not found (throw exception or return null)
            throw new EntityNotFoundException("Student not found with id " + id);
        }
    }
}
