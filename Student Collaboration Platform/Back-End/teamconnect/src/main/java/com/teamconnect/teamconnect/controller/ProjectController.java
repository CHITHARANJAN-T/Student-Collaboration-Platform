package com.teamconnect.teamconnect.controller;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teamconnect.teamconnect.constant.Api;
import com.teamconnect.teamconnect.dto.request.CreateProjectRequest;
import com.teamconnect.teamconnect.dto.request.ProjectRequest;
import com.teamconnect.teamconnect.dto.response.ProjectResponse;
import com.teamconnect.teamconnect.service.ProjectService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Api.PROJECT)
@RequiredArgsConstructor
@Tag(name = "Project")
public class ProjectController {

    private final ProjectService projectService;
    
    @PostMapping("/createProject")
    public ResponseEntity<ProjectResponse> createProject(@RequestBody CreateProjectRequest createProjectRequest,@RequestParam(name = "name")String name ){
        ProjectResponse response = projectService.createProject(createProjectRequest,name);
        return ResponseEntity.ok().body(response) ;
    }

    @PostMapping(value = "/uploadProject/{pid}/{tid}")
    public ResponseEntity<Boolean> uploadProject(@RequestParam(name = "file")MultipartFile File,@PathVariable(name = "pid")Long pid,@PathVariable(name = "tid")Long tid ){

        return ResponseEntity.ok(projectService.uploadProject(File, pid,tid));
    }

    @PutMapping("/updateProject/{pid}")
    public ResponseEntity<Boolean> updateProject(@RequestBody ProjectRequest projectRequest,@PathVariable("pid")Long pid){
        
        return  ResponseEntity.ok(projectService.updateProject(pid, projectRequest));
    }

    @GetMapping(value = "/getProjectFile/{pid}",produces = "application/pdf")
    public ResponseEntity<?> getProjectFile(@PathVariable(name = "pid")Long id){
        return ResponseEntity.ok(projectService.getProjectFile(id));
    }

    @GetMapping("/getProjectById/{pid}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable("pid")Long pid){
        ProjectResponse projectResponse = projectService.getProjectById(pid);
        return projectResponse != null ? ResponseEntity.ok(projectResponse) : ResponseEntity.notFound().build();
    }

    // @GetMapping("/getAllProjectById/{id}")

    @GetMapping("/getProjectByName/{name}")
    public ResponseEntity<List<ProjectResponse>> getProjectByName(@PathVariable("name")String name){
        List<ProjectResponse> projectResponses = projectService.getProjectByName(name);
        return ResponseEntity.ok(projectResponses);
    }

    @GetMapping("/postGrade/{pid}")
    public ResponseEntity<Boolean> postGrade(@PathVariable Long pid,@RequestParam(name="grade") int grade){
        return ResponseEntity.ok(projectService.postGrade(pid, grade));
    }

    @GetMapping("/getAllProject")
    public ResponseEntity<List<ProjectResponse>> getAllProject(){
        List<ProjectResponse> projectResponse = projectService.getAllProject();
        return projectResponse != null ? ResponseEntity.ok(projectResponse) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteProject/{pid}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable(name = "pid")Long pid){
        return ResponseEntity.ok(projectService.deleteProject(pid));
    }

    @GetMapping("/getProjectCount")
    public ResponseEntity<Integer> getUserCount(){
        return ResponseEntity.ok().body(projectService.getProjectCount());
    }

    @GetMapping("/getTeacherProjectByUid/{uid}")
    public ResponseEntity<List<ProjectResponse>> getTeacherProjectByUid(@PathVariable long uid){
        return ResponseEntity.ok(projectService.getCompletedTaskByUid(uid));
    }

    @GetMapping("/getGradedProject/{uid}")
    public ResponseEntity<List<ProjectResponse>> getTeacherProjectGradedByUid(@PathVariable long uid){
        return ResponseEntity.ok(projectService.getGradedProject(uid));
    }    

}
