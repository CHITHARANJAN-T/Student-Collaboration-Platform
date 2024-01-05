package com.ms.feedbackms.service.impl;

import org.springframework.stereotype.Service;
import java.util.*;

import com.ms.feedbackms.dto.request.FeedbackRequest;
import com.ms.feedbackms.model.Feedback;
import com.ms.feedbackms.model.Projects;
import com.ms.feedbackms.repository.FeedbackRepository;
// import com.ms.feedbackms.repository.FeedbackRepository;
import com.ms.feedbackms.repository.ProjectRepository;
import com.ms.feedbackms.service.FeedbackService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService{

    private final FeedbackRepository feedbackRepository;

    private final ProjectRepository projectRepository;

    @Override
     public boolean addFeedback(FeedbackRequest feedbackRequest){
        Projects project = projectRepository.findByProjectname(feedbackRequest.getProjectname()).get();
        List<Feedback> feedbacks = project.getFeedbacks();
        String feedback = feedbackRequest.getFeedback();
        if(feedback!=null){
            Feedback fb = Feedback.builder()
                    .feedbackText(feedback)
                    .build();
        feedbacks.add(fb);
        project.setFeedbacks(feedbacks);
        projectRepository.save(project);
        return true;
    }
        return false;
    }
    
    @Override
    public List<Feedback> getFeedbacks(FeedbackRequest feedbackRequest){
        Projects project = projectRepository.findByProjectname(feedbackRequest.getProjectname()).get();

        return project.getFeedbacks();
    }

    @Override
    public boolean deleteFeedback(long fid){ 
        Feedback feedback = feedbackRepository.findById(fid).get();

        if(feedback!=null){
            feedbackRepository.deleteById(fid);
            return true;
        }
        return false;
    }

    // public boolean deleteFeedbackByProject

}
