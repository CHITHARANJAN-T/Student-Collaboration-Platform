package com.teamconnect.teamconnect.service;

import java.util.List;

import com.teamconnect.teamconnect.dto.request.TaskRequest;
import com.teamconnect.teamconnect.model.Tasks;

public interface TaskService {
    public boolean createTask(TaskRequest taskRequest,Long id,String name);
    
    public boolean updateTask(Long tid);

    public List<Tasks> getAllTaskBySid(Long sid);

    public int getTaskCount(Long sid);

    public List<Tasks> getCompletedTasksBySid(Long sid);

    public int getCompletedTaskCount(Long sid);
}
