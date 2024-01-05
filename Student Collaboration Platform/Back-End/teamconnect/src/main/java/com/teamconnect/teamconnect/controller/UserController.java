package com.teamconnect.teamconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamconnect.teamconnect.constant.Api;
import com.teamconnect.teamconnect.dto.request.UserRequest;
import com.teamconnect.teamconnect.dto.response.TasksResponse;
import com.teamconnect.teamconnect.dto.response.UserResponse;
import com.teamconnect.teamconnect.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Api.USER)
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {
    
    private final UserService userService;
    

    @GetMapping("/get")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> userList = userService.getAllUsers();
        return !userList.isEmpty() ? ResponseEntity.ok().body(userList) : ResponseEntity.noContent().build();
    }

    @GetMapping("/getAllStudents")
    public ResponseEntity<List<UserResponse>> getAllStudents() {
        List<UserResponse> userList = userService.getAllStudents();
        return !userList.isEmpty() ? ResponseEntity.ok().body(userList) : ResponseEntity.noContent().build();
    }

    @GetMapping("/find/{uid}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long uid) {
        UserResponse userResponse = userService.getUser(uid);
        return userResponse != null ? ResponseEntity.ok().body(userResponse) : ResponseEntity.notFound().build();
    }

    @GetMapping("/getUserCount")
    public ResponseEntity<Integer> getUserCount(){
        return ResponseEntity.ok().body(userService.getUserCount());
    }
    

    @PutMapping("/edit/{uid}")
    public ResponseEntity<Boolean> updateUser(@RequestBody UserRequest request, @PathVariable Long uid) {
        
        return  ResponseEntity.ok(userService.updateUser(request, uid));
    }

    @GetMapping("/addFriend/{uid}/{fid}")
    public ResponseEntity<Boolean> addFriend(@PathVariable(name = "fid")Long fid,@PathVariable(name = "uid")Long uid){
        return ResponseEntity.ok(userService.addFriend(uid, fid));
    }
    
    @GetMapping("/removeFriend/{uid}/{fid}")
    public ResponseEntity<Boolean> removeFriend(@PathVariable(name = "fid")Long fid,@PathVariable(name = "uid")Long uid){
        return ResponseEntity.ok(userService.removeFriend(uid, fid));
    }  

    @GetMapping("/getAllFriends/{uid}")
    public ResponseEntity<List<UserResponse>> getAllFriends(@PathVariable(name = "uid")Long uid){
        return ResponseEntity.ok(userService.getAllFriends(uid));
    }

    @GetMapping("/getAllNonFriends/{uid}")
     public ResponseEntity<List<UserResponse>> getAllNonFriends(@PathVariable(name = "uid")Long uid){
        return ResponseEntity.ok(userService.getAllNonFriends(uid));
    }

    @DeleteMapping("/delete/{uid}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long uid){
        return ResponseEntity.ok(userService.deleteUser(uid));
    }

    //Task Teacher

    @GetMapping("/getAllTaskNC/{uid}")
    public ResponseEntity<List<TasksResponse>> getAllTaskNC(@PathVariable Long uid){
        return ResponseEntity.ok(userService.getAllTeacherTasksNc(uid));
    }

    
}
