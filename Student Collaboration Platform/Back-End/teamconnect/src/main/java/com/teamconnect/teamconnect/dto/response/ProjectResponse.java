package com.teamconnect.teamconnect.dto.response;

import lombok.Data;
import java.util.*;

import com.teamconnect.teamconnect.model.Feedback;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private Long pid;
    private String projectname;
    private String description;
    private int grade;
    private List<Feedback> feedbacks;
}
