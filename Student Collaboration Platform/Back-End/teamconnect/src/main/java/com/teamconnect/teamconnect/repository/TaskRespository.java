package com.teamconnect.teamconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamconnect.teamconnect.model.Tasks;

public interface TaskRespository extends JpaRepository<Tasks,Long> {

    @Query(value = "select * from tasks where sid = ? AND status = FALSE",nativeQuery = true )
    public List<Tasks> getAllTasksBySid(Long sid);

    @Query(value = "select count(*) from tasks where sid =? AND status = FALSE",nativeQuery = true)
    public int getTaskCount(Long sid);

    @Query(value = "select * from tasks where sid = ? AND status = TRUE",nativeQuery = true )
    public List<Tasks> getCompletedTasksBySid(Long sid);

    @Query(value = "select count(*) from tasks where sid =? AND status = TRUE",nativeQuery = true)
    public int getCompltedTaskCount(Long sid);


    
    
}
