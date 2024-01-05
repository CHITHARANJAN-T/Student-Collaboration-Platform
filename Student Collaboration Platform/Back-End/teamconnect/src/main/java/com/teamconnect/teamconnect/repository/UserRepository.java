package com.teamconnect.teamconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.teamconnect.teamconnect.model.User;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User>  findByName(String name);

    User findByUid(Long uid);

    void deleteByUid(Long uid);

    @Query( value = "SELECT * FROM User  WHERE uid NOT IN (:userIds)",nativeQuery = true)
    List<User> findUsersNotInList(@Param("userIds") List<Long> userIds);

    @Query(value = "select count(uid) from user",nativeQuery = true)
    int getUserCount();

}
