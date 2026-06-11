package in.yuktisoftwares.query_management.controller;

import in.yuktisoftwares.query_management.model.Query;
import in.yuktisoftwares.query_management.service.QueryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/queries")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000" , maxAge = 3600)
@Slf4j
public class QueryController {

    private final QueryService queryService;

    @GetMapping
    public ResponseEntity<List<Query>> getQueries(){
        log.info("Query service started..");
        List<Query> queries = queryService.getQueries();
        return new ResponseEntity<>(queries,HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Query> getQueryById(@PathVariable Integer id){
        log.info("Getting query details for id: {}", id);
        Query query = queryService.getQueryById(id);
        log.info("Query details returned to user for id {} is {}",id, query);
        return new ResponseEntity<>(query,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Query> saveQuery(@RequestBody Query query){
        log.info("Query from user: {}",query);
        Query savedQuery = queryService.saveQuery(query);
        log.info("Query details returned to user after save in DB is {}", savedQuery);
        return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
    }

    @PutMapping("id/{id}")
    public ResponseEntity<Query> updateQuery(@PathVariable Integer id, @RequestBody Query query){
        log.info("Query from user is {} to update for query id {}",query, id);
        query.setQueryId(id);
        log.info("Query form the user before update {}", query);
        Query updatedQuery = queryService.saveQuery(query);
        log.info("Query details after update returned to user: {}",updatedQuery);
        return new ResponseEntity<>(updatedQuery, HttpStatus.OK);
    }

    @DeleteMapping("id/{id}")
    public ResponseEntity<Void> deleteQuery(@PathVariable Integer id){
        log.info("Query id {} to be delete: ",id);
        queryService.deleteQuery(id);
        return ResponseEntity.noContent().build();
    }
}
