package com.teamconnect.teamconnect.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.teamconnect.teamconnect.model.Feedback;

public interface FeedbackService {
    ResponseEntity<Boolean>  addFeedback(String feedback,String projectname);

    ResponseEntity<List<Feedback>> getFeedbacks(String projectname);

    ResponseEntity<Boolean> deleteFeedback(long fid);
}
