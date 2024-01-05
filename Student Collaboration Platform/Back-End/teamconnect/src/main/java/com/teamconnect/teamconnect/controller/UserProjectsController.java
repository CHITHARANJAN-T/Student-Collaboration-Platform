package com.teamconnect.teamconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamconnect.teamconnect.constant.Api;
import com.teamconnect.teamconnect.service.UserProjectsService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Api.USER_PROJECTS)
@RequiredArgsConstructor
@Tag(name = "UserProjects")
public class UserProjectsController {

    private final UserProjectsService userProjectsService;


    @PostMapping("/addMember/{pid}")
    public ResponseEntity<Boolean> addMember(@RequestParam("name")String name,@PathVariable(name = "pid")Long pid){

        return ResponseEntity.ok(userProjectsService.addMembers(pid,name));
    }

    @PostMapping("/addProject/{pid}")
    public ResponseEntity<Boolean> addProject(@PathVariable(name = "pid")Long pid,@RequestParam("email")String email){

        return ResponseEntity.ok(userProjectsService.addToProjects(pid,email));
    }
    
    @DeleteMapping("/deleteMember/{uid}")
    public ResponseEntity<Boolean> removeMember(@PathVariable(name = "uid")Long uid){

        return ResponseEntity.ok(userProjectsService.removeMember(uid));
    }

    @DeleteMapping("/deleteProject/{pid}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable(name = "pid")Long pid){

        return ResponseEntity.ok(userProjectsService.removeProject(pid));
    }
}
