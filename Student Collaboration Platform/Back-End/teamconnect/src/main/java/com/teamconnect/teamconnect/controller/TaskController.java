package com.teamconnect.teamconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.teamconnect.teamconnect.constant.Api;
import com.teamconnect.teamconnect.dto.request.TaskRequest;
import com.teamconnect.teamconnect.model.Tasks;
import com.teamconnect.teamconnect.service.TaskService;
import java.util.List;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Api.TASKS)
@RequiredArgsConstructor
@Tag(name = "tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/createTask/{uid}")
    public ResponseEntity<Boolean> createTask(@RequestBody TaskRequest taskRequest,@PathVariable(name = "uid")Long uid,@RequestParam(name="name")String name){
        // System.out.println(taskRequest.getTask());
        return ResponseEntity.ok(taskService.createTask(taskRequest, uid,name));
    }

    @PutMapping("/updateTask/{tid}")
    public ResponseEntity<Boolean> updateTask(@PathVariable(name = "tid")Long tid){
        return ResponseEntity.ok(taskService.updateTask(tid));
    }

    @GetMapping("/getTaskById/{sid}")
    public ResponseEntity<List<Tasks>> getAllTasksById(@PathVariable(name = "sid")Long sid){
        return ResponseEntity.ok().body(taskService.getAllTaskBySid(sid));
    }

    // @GetMapping("")

    @GetMapping("/getCompletedTask/{sid}")
    public ResponseEntity<List<Tasks>> getAllCompletedTasksById(@PathVariable(name = "sid")Long sid){
        return ResponseEntity.ok().body(taskService.getCompletedTasksBySid(sid));
    }

    @GetMapping("/getCompletedTaskCount/{sid}")
    public ResponseEntity<Integer> getCompletedTaskCount(@PathVariable(name = "sid")Long sid){
        return ResponseEntity.ok().body(taskService.getCompletedTaskCount(sid));
    }

    

    @GetMapping("/getTaskCount/{sid}")
    public ResponseEntity<Integer> getTaskCount(@PathVariable(name = "sid")Long sid){
        return ResponseEntity.ok().body(taskService.getTaskCount(sid));
    }

    // @GetMapping("/getAllProjectBySid/{sid}")

}
