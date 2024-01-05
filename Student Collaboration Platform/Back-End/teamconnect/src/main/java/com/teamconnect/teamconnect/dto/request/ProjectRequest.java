package com.teamconnect.teamconnect.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {
    private Long pid;
    private String projectname;
    private String description;
    private byte[] project;
}
