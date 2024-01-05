package com.teamconnect.teamconnect.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;

import com.teamconnect.teamconnect.model.Projects;



public interface ProjectRepository extends JpaRepository<Projects,Long>{
    Optional<Projects> findByProjectname(String projectname);

    Projects  findByPid(Long pid);

    void deleteByPid(Long pid);

    @Query(value = "Select * from projects where tid in (:lid) AND grade = 0",nativeQuery = true)
    List<Projects> getAllProjectsByTid(List<Long> lid);

    @Query(value = "Select * from projects where tid in (:lid) AND grade != 0",nativeQuery = true)
    List<Projects> getGradedProjects(List<Long> lid);

     @Query(value = "select count(pid) from projects",nativeQuery = true)
    int getProjectsCount();

}
