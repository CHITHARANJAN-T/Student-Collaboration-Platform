package com.teamconnect.teamconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamconnect.teamconnect.model.Community;

public interface CommunityRepository extends JpaRepository<Community,Long>{
    
}
