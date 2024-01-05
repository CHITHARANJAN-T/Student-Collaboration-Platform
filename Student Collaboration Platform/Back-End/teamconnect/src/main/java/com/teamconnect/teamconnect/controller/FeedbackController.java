package com.teamconnect.teamconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teamconnect.teamconnect.constant.Api;
import com.teamconnect.teamconnect.model.Feedback;
import com.teamconnect.teamconnect.service.FeedbackService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(Api.FEEDBACK)
@RequiredArgsConstructor
@Tag(name = "Feedback")
public class FeedbackController {
    public final FeedbackService feedbackService;

    @GetMapping("/addFeedback")
    public ResponseEntity<Boolean> addFeedback(@RequestParam(name = "feedback")String feedback,@RequestParam(name = "projectname")String projectname){
        return feedbackService.addFeedback(feedback, projectname);
    }

    @GetMapping("/getFeedback")
    public ResponseEntity<List<Feedback>> getFeedback(@RequestParam(name = "projectname")String projectname){
       
        // return ResponseEntity.ok(true);
        return feedbackService.getFeedbacks(projectname);
    }

    @DeleteMapping("/deleteFeedback/{fid}")
    public ResponseEntity<Boolean> deleteFeedback(@PathVariable(name = "fid")long fid){

        return feedbackService.deleteFeedback(fid);
    }
}
