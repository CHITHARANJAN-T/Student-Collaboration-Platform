package com.teamconnect.teamconnect.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="userprojects")
public class UserProjects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long upid;

    private Long pid;

    private Long uid;
    
}
