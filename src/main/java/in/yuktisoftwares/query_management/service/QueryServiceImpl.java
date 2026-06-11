package in.yuktisoftwares.query_management.service;

import in.yuktisoftwares.query_management.entity.QueryEntity;
import in.yuktisoftwares.query_management.entity.StudentEntity;
import in.yuktisoftwares.query_management.model.Query;
import in.yuktisoftwares.query_management.model.Student;
import in.yuktisoftwares.query_management.repository.QueryRepository;
import in.yuktisoftwares.query_management.repository.StudentRepository;
import in.yuktisoftwares.query_management.utils.QueryUtil;
import in.yuktisoftwares.query_management.utils.StudentUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class QueryServiceImpl implements QueryService{

    private final QueryRepository queryRepository;
    private final StudentRepository studentRepository;

    public List<Query> getQueries() {
        List<QueryEntity> queryEntities = (List<QueryEntity>) queryRepository.findAll();
        log.info("Queries returned form DB: {}", queryEntities);
        ArrayList<Query> queries = new ArrayList<Query>();
        if (queryEntities != null && queryEntities.size() > 0) {
            queryEntities.stream().forEach(query -> {
                queries.add(QueryUtil.entityToModel(query));
            });
        }
        log.info("Queries returned to user after transformation: {}", queries);
        return queries;
    }

    @Override
    public Query getQueryById(Integer id) {
        Optional<QueryEntity> queryEntity = queryRepository.findById(id);
        QueryEntity entity = queryEntity.isPresent()?queryEntity.get():null;
        log.info("Query detail from DB for id {} is {}",id,entity);
        if(entity != null){
            return QueryUtil.entityToModel(entity);
        }
        return new Query();
    }

    @Override
    public Query saveQuery(Query query) {
        if (query == null) {
            throw new EntityNotFoundException("Query cann't be empty");
        }
        QueryEntity queryEntity  = QueryUtil.modelToEntity(query);
        log.info("Query after transformation: {}",queryEntity);
        Student student = query.getStudent();
        log.info("Student details from user: {}",student);
        if (student != null && student.getStudentId() == null) {
            log.info("Student details before model to entity transformation: {}",student);
            StudentEntity  studentEntity = StudentUtil.modelToEntity(student);
            log.info("Student details before save in DB: {}",studentEntity);
            StudentEntity savedStudentEntity = studentRepository.save(studentEntity);
            log.info("Student details after save in DB: {}",studentEntity);
            queryEntity.setStudent(savedStudentEntity);
        }else {
            if(student != null){
                log.info("Student details before find by id DB call: {}",student);
                Optional<StudentEntity> optionalStudentEntity = studentRepository.findById(student.getStudentId());
                log.info("Student details after DB call: {}",optionalStudentEntity.isPresent());
                if (optionalStudentEntity.isPresent()) {
                    StudentEntity st = optionalStudentEntity.get();
                    log.info("Student details from DB: {}",st);
                    st = StudentUtil.modelToEntity(student);
                    log.info("Student details after transformation is {}", st);
                   StudentEntity studentUpdatedInDB = studentRepository.save(st);
                   log.info("id of updated student {} is & details is {}", studentUpdatedInDB.getId(), studentUpdatedInDB);
                    queryEntity.setStudent(studentUpdatedInDB);
                } else {
                    throw new EntityNotFoundException("Student is not found for id: " + student.getStudentId());
                }
            }else{
                throw new EntityNotFoundException("Student is not found for the query");
            }
        }
        QueryEntity savedQueryEntity = queryRepository.save(queryEntity);
        log.info("Query saved in DB: {}",savedQueryEntity);
        Query savedQuery = QueryUtil.entityToModel(savedQueryEntity);
        log.info("Query returned to user: {}",savedQuery);
        return savedQuery;
    }

    @Override
    public void deleteQuery(Integer id) {
        queryRepository.deleteById(id);
        log.info("Query deleted successfully.");
    }
}
