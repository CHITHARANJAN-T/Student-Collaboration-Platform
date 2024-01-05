package com.teamconnect.teamconnect.repository;

import java.util.*;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.teamconnect.teamconnect.model.UserProjects;

public interface UserProjectsRespository extends JpaRepository<UserProjects,Long>
{
    Optional<List<UserProjects>> findAllByUid(long uid);

    Optional<List<UserProjects>> findAllByPid(long pid);

    @Query(value = "select * from userprojects where uid=?",nativeQuery = true)
    List<UserProjects> getAllByUser(long uid);

    // @Query(value = "select * from userprojects where uid=? and pid=?",nativeQuery = true)
    UserProjects findByUidAndPid(long uid, long pid);
}
