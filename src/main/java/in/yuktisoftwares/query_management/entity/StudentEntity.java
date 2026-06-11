package in.yuktisoftwares.query_management.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "student")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentEntity {

    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "student_id_sequence_name")
    @SequenceGenerator(name = "student_id_sequence_name", sequenceName = "student_id_seq", allocationSize = 1)
    @Id
    private Integer id;
    @Column(name="name")
    private String name;
    @Column(name="email_id")
    private String emailId;
    @Column(name="mobile")
    private String mobile;
    @Column(name="address")
    private String address;
    @Column(name="college")
    private String college;
    @Column(name="degree")
    private String degree;
    @Column(name="branch")
    private String branch;
    @Column(name="semester")
    private String semester;
    @Column(name="passing_year")
    private String passingYear;
    @Column(name="visit_purpose")
    private String visitPurpose;
    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<QueryEntity> queries = new ArrayList<>();
}
