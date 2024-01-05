package com.teamconnect.teamconnect.service.impl;


import java.util.List;

import org.springframework.stereotype.Service;

import com.teamconnect.teamconnect.dto.request.TaskRequest;
import com.teamconnect.teamconnect.model.Tasks;
import com.teamconnect.teamconnect.model.User;
import com.teamconnect.teamconnect.model.enumerate.Role;
// import com.teamconnect.teamconnect.repository.ProjectRepository;
import com.teamconnect.teamconnect.repository.TaskRespository;
import com.teamconnect.teamconnect.repository.UserRepository;
import com.teamconnect.teamconnect.service.TaskService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRespository taskRespository;
    private final UserRepository userRepository;
    // private final ProjectRepository projectRepository;

    @Override
    public boolean createTask(TaskRequest taskRequest,Long sid,String name){
        User user =  userRepository.findByName(name).get();
        User stud = userRepository.findByUid(sid);
        List<Tasks> tasks = user.getTasks();
        String taskText= taskRequest.getTask();
        String description = taskRequest.getDescription();
        if(taskText==null || description==null || user.getRole()!=Role.TEACHER || stud.getRole()!=Role.STUDENT){
            return false;
        }
        Tasks task = Tasks.builder()
                        .task(taskRequest.getTask())
                        .description(taskRequest.getDescription())
                        .sid(sid)
                        .status(false)
                        .build();
        tasks.add(task);
        user.setTasks(tasks);
        userRepository.save(user);

        return true;

    }

    @Override
    public boolean updateTask(Long tid){
        Tasks task = taskRespository.findById(tid).get();
        task.setStatus(true);
        return true;
    }

    @Override
    public List<Tasks> getAllTaskBySid(Long sid){
        return taskRespository.getAllTasksBySid(sid);
    }

    // public List<Tasks> getAllTasksByPid(Long pid){
    //     // return
    //     Tasks t = new Tasks();
    //     t.get 
    //     return null;
    // }

    @Override
    public int getTaskCount(Long sid){
        return taskRespository.getTaskCount(sid);
    }

    @Override
    public List<Tasks> getCompletedTasksBySid(Long sid){
        return taskRespository.getCompletedTasksBySid(sid);
    }

    @Override
    public int getCompletedTaskCount(Long sid){
        return taskRespository.getCompltedTaskCount(sid);
    }

}
