package com.teamconnect.teamconnect.service;

import java.util.List;

import com.teamconnect.teamconnect.dto.request.UserRequest;
import com.teamconnect.teamconnect.dto.response.TasksResponse;
import com.teamconnect.teamconnect.dto.response.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUser(Long uid);

    public List<UserResponse> getAllStudents();

    boolean updateUser(UserRequest request, Long uid);

    boolean deleteUser(Long uid);

    int getUserCount();

    public List<TasksResponse> getAllTeacherTasksNc(Long uid);

    public List<UserResponse> getAllNonFriends(Long uid);

    List<UserResponse> getAllFriends(Long uid);

    public boolean removeFriend(Long uid,Long fid);

    public boolean addFriend(Long uid,Long fid);

}
