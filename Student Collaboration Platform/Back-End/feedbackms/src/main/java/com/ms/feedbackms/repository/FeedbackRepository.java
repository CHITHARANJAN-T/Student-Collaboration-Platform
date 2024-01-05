package com.ms.feedbackms.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.ms.feedbackms.model.Feedback;



public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    
}
