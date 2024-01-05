package com.teamconnect.teamconnect.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import com.teamconnect.teamconnect.dto.response.CommunityResponse;
import com.teamconnect.teamconnect.model.Community;
import com.teamconnect.teamconnect.repository.CommunityRepository;
import com.teamconnect.teamconnect.repository.UserRepository;
import com.teamconnect.teamconnect.service.CommunityService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Configuration
@Transactional
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{
    
    private  final CommunityRepository communityRepository;

    private final UserRepository userRepository;

    @Override
    public boolean addMessage(String message,long uid){
        Community ct= new Community();
        ct. setUid(uid);
        ct.setMessage(message);
        communityRepository.save(ct);
        return true;
    }

    @Override
    public List<CommunityResponse> getAllMessages(){
        List<Community> c = communityRepository.findAll();

        List<CommunityResponse> list = new ArrayList<>();
        for(Community i:c){
            String m = userRepository.findByUid(i.getUid()).getName();
            list.add(mapCommunityToCommunityResponse(i, m));
        }
        return list;
    }

    private CommunityResponse mapCommunityToCommunityResponse(Community community,String username) {
        return CommunityResponse.builder()
                .cid(community.getCid())
                .uid(community.getUid())
                .username(username)
                .message(community.getMessage())
                .build();
    }

}
