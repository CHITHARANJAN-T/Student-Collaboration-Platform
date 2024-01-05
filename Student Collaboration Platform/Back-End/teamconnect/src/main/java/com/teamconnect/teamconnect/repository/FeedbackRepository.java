package com.teamconnect.teamconnect.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.teamconnect.teamconnect.model.Feedback;



public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    
}
