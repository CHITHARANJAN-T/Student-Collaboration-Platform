package com.ms.feedbackms.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ms.feedbackms.dto.request.FeedbackRequest;
// import com.ms.feedbackms.constant.Api;
import com.ms.feedbackms.model.Feedback;
import com.ms.feedbackms.service.FeedbackService;

// import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    public final FeedbackService feedbackService;

    @PostMapping("/addFeedback")
    public ResponseEntity<Boolean> addFeedback(@RequestBody FeedbackRequest feedbackRequest){
        return ResponseEntity.ok(feedbackService.addFeedback(feedbackRequest));
    }

    @PostMapping("/getFeedback")
    public ResponseEntity<List<Feedback>> getFeedback(@RequestBody FeedbackRequest feedbackRequest){
       
        // return ResponseEntity.ok(true);
        return ResponseEntity.ok().body(feedbackService.getFeedbacks(feedbackRequest));
    }

    @PostMapping("/deleteFeedback/{fid}")
    public ResponseEntity<Boolean> deleteFeedback(@RequestBody FeedbackRequest feedbackRequest){

        return ResponseEntity.ok(feedbackService.deleteFeedback(feedbackRequest.getId()));
    }
}
