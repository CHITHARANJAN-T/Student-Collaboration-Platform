package com.teamconnect.teamconnect.service.impl;


import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



import com.teamconnect.teamconnect.dto.request.FeedbackRequest;
import com.teamconnect.teamconnect.model.Feedback;
// import com.teamconnect.teamconnect.model.Projects;
// import com.teamconnect.teamconnect.repository.FeedbackRepository;
// import com.teamconnect.teamconnect.repository.FeedbackRepository;
// import com.teamconnect.teamconnect.repository.ProjectRepository;
import com.teamconnect.teamconnect.service.FeedbackService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Configuration
@Transactional
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService{

    // private final FeedbackRepository feedbackRepository;

    // private final ProjectRepository projectRepository;

    @Bean
    public  RestTemplate restTemplate(){
        return new RestTemplate();
    }

    @Override
     public ResponseEntity<Boolean> addFeedback(String feedback,String projectname){
        
        FeedbackRequest feedbackRequest = new FeedbackRequest();
        feedbackRequest.setFeedback(feedback);
        feedbackRequest.setProjectname(projectname);
        // if(feedback!=null){
        //     Feedback fb = Feedback.builder()
        //             .feedbackText(feedback)
        //             .build();
        // feedbacks.add(fb);
        // project.setFeedbacks(feedbacks);
        // projectRepository.save(project);

        ResponseEntity<Boolean> responseEntity = restTemplate().postForEntity("http://localhost:8000/api/v1/feedback/addFeedback", feedbackRequest,Boolean.class);


        return responseEntity;
    }
    
    @Override
    public ResponseEntity<List<Feedback>> getFeedbacks(String projectname){
        FeedbackRequest feedbackRequest = new FeedbackRequest();
        feedbackRequest.setProjectname(projectname);

       ResponseEntity<Feedback[]> responseEntity = restTemplate().postForEntity("http://localhost:8000/api/v1/feedback/getFeedback",feedbackRequest , Feedback[].class);

       List<Feedback> list =Arrays.asList(responseEntity.getBody());

       for(Feedback i : list){
        System.out.println(i.getFeedbackText());
       }

        return ResponseEntity.ok().body(list);
    }

    @Override
    public ResponseEntity<Boolean> deleteFeedback(long fid){ 

         FeedbackRequest feedbackRequest = new FeedbackRequest();
        feedbackRequest.setId(fid);;
        
        ResponseEntity<Boolean> responseEntity = restTemplate().postForEntity("http://localhost:8000/api/v1/feedback/deleteFeedback/"+fid,feedbackRequest,Boolean.class);

        return responseEntity;

    }

    // public boolean deleteFeedbackByProject

}

