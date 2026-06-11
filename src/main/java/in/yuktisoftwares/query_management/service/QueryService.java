package in.yuktisoftwares.query_management.service;

import in.yuktisoftwares.query_management.model.Query;
import org.apache.el.stream.Optional;

import java.util.List;

public interface QueryService {

    List<Query> getQueries();
    Query getQueryById(Integer id);
    Query saveQuery(Query query);
    void deleteQuery(Integer id);
}
