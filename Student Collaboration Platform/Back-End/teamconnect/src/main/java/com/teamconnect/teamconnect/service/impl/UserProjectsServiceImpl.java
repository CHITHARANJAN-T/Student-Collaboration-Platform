package com.teamconnect.teamconnect.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.teamconnect.teamconnect.model.Projects;
import com.teamconnect.teamconnect.model.User;
import com.teamconnect.teamconnect.model.UserProjects;
import com.teamconnect.teamconnect.repository.ProjectRepository;
import com.teamconnect.teamconnect.repository.UserProjectsRespository;
import com.teamconnect.teamconnect.repository.UserRepository;
import com.teamconnect.teamconnect.service.UserProjectsService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserProjectsServiceImpl implements UserProjectsService{
    private final UserProjectsRespository userProjectsRespository;

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    @Override
    public boolean addMembers(long pid,String name){
        Projects projects = projectRepository.findByPid(pid);
        User user = userRepository.findByName(name).get();
        UserProjects isExistsUserProjects = userProjectsRespository.findByUidAndPid(user.getUid(),pid);
        if(isExistsUserProjects == null && projects!=null && user!=null){
            UserProjects userProjects = UserProjects.builder()
                                .pid(pid)
                                .uid(user.getUid())
                                .build();

            userProjectsRespository.save(userProjects);
            return true;
        }
        return false;
    }

    @Override
    public boolean addToProjects(long pid,String email){
        Projects projects = projectRepository.findByPid(pid);
        User user = userRepository.findByEmail(email).get();
        UserProjects isExistsUserProjects = userProjectsRespository.findByUidAndPid(user.getUid(),pid);
        if(isExistsUserProjects == null && projects!=null && user!=null){
            UserProjects userProjects = UserProjects.builder()
                                .pid(pid)
                                .uid(user.getUid())
                                .build();

            userProjectsRespository.save(userProjects);
            return true;
        }
        return false;
    }

    @Override
    public boolean removeMember(long uid){
        List<UserProjects> isExistsUserProjects = userProjectsRespository.findAllByUid(uid).get();
        
        if(isExistsUserProjects!=null){
            for(UserProjects userProjects:isExistsUserProjects){
                userProjectsRespository.deleteById(userProjects.getUpid());
            }
            return true;
        }
        return false;
    }

    @Override
    public boolean removeProject(long pid){
        List<UserProjects> isExistsUserProjects = userProjectsRespository.findAllByPid(pid).get();
        if(isExistsUserProjects!=null){
            for(UserProjects userProjects:isExistsUserProjects){
                userProjectsRespository.deleteById(userProjects.getUpid());
            }
            return true;
        }
        return false;
    }

    @Override
    public List<UserProjects> getAllByUser(Long uid){
        Optional<List<UserProjects>> up = userProjectsRespository.findAllByUid(uid);
        if(up.isPresent())
            return up.get();

        return null;
    }
}
