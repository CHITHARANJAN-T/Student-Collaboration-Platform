package com.teamconnect.teamconnect.service;

import java.util.List;

import com.teamconnect.teamconnect.dto.response.CommunityResponse;

public interface CommunityService {

    boolean addMessage(String message,long uid);

    List<CommunityResponse> getAllMessages();
}
