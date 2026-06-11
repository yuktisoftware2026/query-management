package in.yuktisoftwares.query_management.model;

import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Component
public class Student {

    private Integer studentId;
    private String name;
    private String emailId;
    private String mobile;
    private String address;
    private String college;
    private String degree;
    private String branch;
    private String semester;
    private String passingYear;
    private  String visitPurpose;
}
