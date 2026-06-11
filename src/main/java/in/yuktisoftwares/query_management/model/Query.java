package in.yuktisoftwares.query_management.model;

import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Component
public class Query {
    private String assignedTo;
    private String attachments;
    private String comments;
    private Integer queryId;
    private String priority;
    private Date queryDate;
    private String queryDescription;
    private String referralSource;
    private String remark;
    private String response;
    private String responseTimeframe;
    private String status;
    private Student student;
}
