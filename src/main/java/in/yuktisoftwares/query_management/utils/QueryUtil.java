package in.yuktisoftwares.query_management.utils;

import in.yuktisoftwares.query_management.entity.QueryEntity;
import in.yuktisoftwares.query_management.entity.StudentEntity;
import in.yuktisoftwares.query_management.model.Query;
import in.yuktisoftwares.query_management.model.Student;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class QueryUtil {

    public static Query entityToModel(QueryEntity entity) {
        if (entity == null) {
            return null;
        } else {
            return Query.builder().queryId(entity.getQueryId()).priority(entity.getPriority()).queryDate(entity.getQueryDate())
                    .status(entity.getStatus()).queryDescription(entity.getQueryDescription())
                    .response(entity.getResponse()).responseTimeframe(entity.getResponseTimeframe())
                    .assignedTo(entity.getAssignedTo()).attachments(entity.getAttachments()).comments(entity.getComments())
                    .remark(entity.getRemark()).referralSource(entity.getReferralSource())
                    .student(StudentUtil.entityToModel(entity.getStudent()))
                    .build();
        }
    }
    public static QueryEntity modelToEntity(Query model) {
        if(model == null){
            return null;
        }
        log.info("Student details to be transfer: ",model.getStudent());
        return QueryEntity.builder().queryId(model.getQueryId()).queryDescription(model.getQueryDescription())
                .queryDate(model.getQueryDate()).priority(model.getPriority()).remark(model.getRemark())
                .comments(model.getComments()).attachments(model.getAttachments())
                .responseTimeframe(model.getResponseTimeframe()).referralSource(model.getReferralSource())
                .assignedTo(model.getAssignedTo()).status(model.getStatus())
                .response(model.getResponse()).student(StudentUtil.modelToEntity(model.getStudent())).build();

    }
}