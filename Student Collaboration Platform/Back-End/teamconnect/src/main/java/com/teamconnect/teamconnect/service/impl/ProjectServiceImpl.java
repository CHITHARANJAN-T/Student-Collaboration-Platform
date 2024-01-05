package com.teamconnect.teamconnect.service.impl;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.teamconnect.teamconnect.dto.request.CreateProjectRequest;
import com.teamconnect.teamconnect.dto.request.ProjectRequest;
import com.teamconnect.teamconnect.dto.response.ProjectResponse;
import com.teamconnect.teamconnect.model.Projects;
import com.teamconnect.teamconnect.model.Tasks;
import com.teamconnect.teamconnect.model.User;
import com.teamconnect.teamconnect.model.UserProjects;
import com.teamconnect.teamconnect.repository.ProjectRepository;
import com.teamconnect.teamconnect.repository.TaskRespository;
import com.teamconnect.teamconnect.repository.UserRepository;
import com.teamconnect.teamconnect.service.ProjectService;
import com.teamconnect.teamconnect.service.UserProjectsService;
import com.teamconnect.teamconnect.util.FileCompress;

import java.util.*;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService{
    
    private final ProjectRepository projectRepository;

    private final UserProjectsService userProjectsService;

    private final UserRepository userRepository;

    private final TaskRespository taskRespository;
    
    private Projects  projectVariable ;

    @Override
    public List<ProjectResponse> getAllProject(){
        List<Projects> projectList = projectRepository.findAll(Sort.by("grade").descending());

        
        return projectList.stream()
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponse getProjectById(long pid){
        Projects projects = projectRepository.findById(pid).get();
        // System.out.println(projects.getMembers());
        return mapUserToUserResponse(projects);

    }
    
    @Override
    public List<ProjectResponse> getProjectByName(String name){
        List<Projects> projectList = new ArrayList<>();
        // long a =3;
        User user = userRepository.findByName(name).get();
        List<UserProjects> up = userProjectsService.getAllByUser(user.getUid());
        if(up.isEmpty())
            return null;
        for(UserProjects i:up){
            // System.out.println(projectRepository.findByPid(i.getPid()));
            projectList.add(projectRepository.findByPid(i.getPid()));
        }
        return projectList.stream()
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());

        // return null;
    }

    @Override
    public ProjectResponse createProject(CreateProjectRequest createProjectRequest,String name){
        Optional<Projects> isProjectExists = projectRepository.findByProjectname(createProjectRequest.getProjectname());
        if(!isProjectExists.isPresent()){
            projectVariable = Projects.builder()
                        .projectname(createProjectRequest.getProjectname())
                        .description(createProjectRequest.getDescription())
                        .build();
                        projectRepository.save(projectVariable);
            Projects project = projectRepository.findByProjectname(createProjectRequest.getProjectname()).get();
            User user = userRepository.findByName(name).get();
            boolean isMemberAdded = userProjectsService.addMembers(project.getPid(), user.getName());
            System.out.println(project);
            if(isMemberAdded){
                return mapUserToUserResponse(project);
            }
        }
        return mapUserToUserResponse(null);
    }

    @Override
    public boolean updateProject(long pid,ProjectRequest projectRequest){

        Projects projects = projectRepository.findById(pid).get();
        projects.setDescription(projectRequest.getDescription());
        projects.setProject(projectRequest.getProject());
        
        projectRepository.save(projects);

        return true;
    }

   @Override
   public boolean deleteProject(long pid){
        Projects project = projectRepository.findByPid(pid);
        if(project!=null){
            boolean flag =userProjectsService.removeProject(pid);
            projectRepository.deleteById(pid);

            return true && flag;
        }
        return false;
            
    }

    @Override
    public int getProjectCount(){
        return projectRepository.getProjectsCount();
    }

    @Override
    public List<ProjectResponse> getCompletedTaskByUid(Long uid){
        User users = userRepository.findById(uid).get();
        List<Tasks> t = users.getTasks();
        List<Long> lid = new ArrayList<>();
        for(Tasks i:t){
            if(i.isStatus()){
                lid.add(i.getTid());
            }
        }

        List<Projects> userList = projectRepository.getAllProjectsByTid(lid);

        return userList.stream()
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getGradedProject(Long uid){
         User users = userRepository.findById(uid).get();
        List<Tasks> t = users.getTasks();
        List<Long> lid = new ArrayList<>();
        for(Tasks i:t){
            if(i.isStatus()){
                lid.add(i.getTid());
            }
        }

        List<Projects> userList = projectRepository.getGradedProjects(lid);

        // return null;
        return userList.stream()
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public boolean postGrade(Long pid,int grade){
        Projects project = projectRepository.findByPid(pid);
        project.setGrade(grade);
        projectRepository.save(project);
        return true;
    }

    

    @Override
    public boolean uploadProject(MultipartFile File,Long pid,Long tid){

        Projects project = projectRepository.findByPid(pid);

        if(project!=null){
            try {
                project.setProject(FileCompress.compressFile(File.getBytes()));
                project.setTid(tid);
                projectRepository.save(project);
                Tasks task = taskRespository.findById(tid).get();
                task.setStatus(true);
                taskRespository.save(task);
                return true;
                
            } catch (Exception e) {
                return false;
            }
        }

        return false;
    }

    @Override
    public byte[] getProjectFile(Long id){
        Projects project = projectRepository.findByPid(id);
        if(project.getProject()==null){
            return null;
        }
        return FileCompress.decompressFile(project.getProject());
    }

    private ProjectResponse mapUserToUserResponse(Projects projects) {

        if(projects==null){
            return null;
        }
        
        return ProjectResponse.builder()
                .pid(projects.getPid()==null?0:projects.getPid())
                .projectname(projects.getProjectname())
                .description(projects.getDescription())
                .grade(projects.getGrade())
                .feedbacks(projects.getFeedbacks())
                .build();
    }



}
