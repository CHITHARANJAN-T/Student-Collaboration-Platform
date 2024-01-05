package com.teamconnect.teamconnect.service;

import java.util.List;


import com.teamconnect.teamconnect.model.UserProjects;

public interface UserProjectsService {
    boolean addMembers(long pid,String name);

    boolean addToProjects(long pid,String email);

    boolean removeMember(long uid);

    boolean removeProject(long pid);

    
    List<UserProjects> getAllByUser(Long uid);
}
