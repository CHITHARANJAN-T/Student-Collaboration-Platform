package com.teamconnect.teamconnect.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teamconnect.teamconnect.model.UserFriends;

public interface UserFriendsRepository extends JpaRepository<UserFriends,Long>{
    Optional<List<UserFriends>> findAllByUid(long uid);


    UserFriends findByUidAndFid(long uid, long fid);
}
