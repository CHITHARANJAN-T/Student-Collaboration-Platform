package com.teamconnect.teamconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamconnect.teamconnect.service.CommunityService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import com.teamconnect.teamconnect.constant.Api;
import com.teamconnect.teamconnect.dto.response.CommunityResponse;


@RestController
@RequestMapping(Api.COMMUNTIY)
@RequiredArgsConstructor
@Tag(name = "community")
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/addMessage")
    public ResponseEntity<Boolean> addMessage(@RequestParam(name = "message")String message,@RequestParam(name = "uid")long uid){
    return ResponseEntity.ok(communityService.addMessage(message,uid)); 
    }

    @GetMapping("/getAllMessages" )
    public ResponseEntity<List<CommunityResponse>> getAllMessages(){
    return ResponseEntity.ok(communityService.getAllMessages());
}

}
