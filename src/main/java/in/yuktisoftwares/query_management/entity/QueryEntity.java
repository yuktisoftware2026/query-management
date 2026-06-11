package in.yuktisoftwares.query_management.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "query")
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QueryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "query_id_sequence_name")
    @SequenceGenerator(name = "query_id_sequence_name", sequenceName = "query_id_seq", allocationSize = 1)
    private Integer queryId;
    @Column(name="description")
    private String queryDescription;
    @Column(name="status")
    private String status;
    @Column(name="response")
    private String response;
    @Column(name="query_date")
    private Date queryDate;
    @Column(name="priority")
    private String priority;
    @Column(name="attachments")
    private String attachments;
    @Column(name="response_timeframe")
    private String responseTimeframe;
    @Column(name="comments")
    private String comments;
    @Column(name="assigned_to")
    private String assignedTo;
    @Column(name="referral_source")
    private String referralSource;
    @Column(name="remark")
    private String remark;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id")
    @ToString.Exclude
    private StudentEntity student;
}
