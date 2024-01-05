package com.ms.feedbackms.service;

import java.util.List;

import com.ms.feedbackms.dto.request.FeedbackRequest;
import com.ms.feedbackms.model.Feedback;

public interface FeedbackService {
    boolean addFeedback(FeedbackRequest feedbackRequest);

    List<Feedback> getFeedbacks(FeedbackRequest feedbackRequest);

    boolean deleteFeedback(long fid);
}
