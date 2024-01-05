package com.teamconnect.teamconnect.dto.response;


import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TasksResponse {
    private Long tid;

    private Long sid;

    private String task;

    private String description;

    private boolean status;
}
