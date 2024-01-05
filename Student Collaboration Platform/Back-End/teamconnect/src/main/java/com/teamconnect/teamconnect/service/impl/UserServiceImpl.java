package com.teamconnect.teamconnect.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamconnect.teamconnect.dto.request.UserRequest;
import com.teamconnect.teamconnect.dto.response.TasksResponse;
import com.teamconnect.teamconnect.dto.response.UserResponse;
import com.teamconnect.teamconnect.model.Tasks;
import com.teamconnect.teamconnect.model.User;
import com.teamconnect.teamconnect.model.UserFriends;
import com.teamconnect.teamconnect.model.enumerate.Role;
import com.teamconnect.teamconnect.repository.UserFriendsRepository;
import com.teamconnect.teamconnect.repository.UserRepository;
import com.teamconnect.teamconnect.service.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserFriendsRepository userFriendsRepository;

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .filter(user -> !user.getRole().equals(Role.ADMIN))
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserResponse> getAllStudents(){
        List<User> userList  = userRepository.findAll();
        return userList.stream()
                .filter(user -> !user.getRole().equals(Role.ADMIN) && !user.getRole().equals((Role.TEACHER)))
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUser(Long uid) {
        User user = userRepository.findByUid(uid);
        return mapUserToUserResponse(user);
    }

    @Override
    public boolean updateUser(UserRequest request, Long uid) {
        User user = userRepository.findByUid(uid);

        if (user!=null){
           
            if(request.getName()!=null){
                Optional<User> isExist = userRepository.findByName(request.getName());

                    if(!isExist.isPresent()) {
                        user.setName(request.getName());
                    }
                    else{
                        return false;
                    }

            }

            if(request.getPassword()!=null){
                user.setPassword(passwordEncoder.encode(request.getPassword()));
            }


            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public int getUserCount(){

        return userRepository.getUserCount();
    }

    @Override
    public boolean deleteUser(Long uid){
        User user  = userRepository.findById(uid).get();
        if(user!=null){
            userRepository.deleteById(uid);
            return true;
        }
        return false;
    }

    @Override
    public boolean addFriend(Long uid,Long fid){
        User f1 = userRepository.findByUid(uid);
        User f2 = userRepository.findByUid(fid);

        if(f1!=null && f2!=null){
            UserFriends isExistUserFriend = userFriendsRepository.findByUidAndFid(uid, fid);
            if(isExistUserFriend==null){
                UserFriends uf = new UserFriends();
                uf.setFid(fid);
                uf.setUid(uid);
                userFriendsRepository.save(uf);
                return true;
            }
        }

        return false;
    }

    @Override
    public boolean removeFriend(Long uid,Long fid){
         UserFriends isExistUserFriend = userFriendsRepository.findByUidAndFid(uid, fid);
            if(isExistUserFriend!=null){
                userFriendsRepository.deleteById(isExistUserFriend.getUfid());
                return true;
            }
        return false;
    }

    @Override
    public List<UserResponse> getAllFriends(Long uid){
       Optional<List<UserFriends>> ul = userFriendsRepository.findAllByUid(uid);

       if(ul.isPresent()){
            List<UserFriends> uf = ul.get();
            List<User> userList = new ArrayList<>();
            for(UserFriends i :uf){
                User u = userRepository.findByUid(i.getFid());
                userList.add(u);
            }

            return userList.stream()
                .filter(user -> !user.getRole().equals(Role.ADMIN))
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
       }
       return null;
    }

    @Override
    public List<UserResponse> getAllNonFriends(Long uid){
        List<UserFriends> ul = userFriendsRepository.findAllByUid(uid).get();

        List<Long> selectedUserIds = new ArrayList<>();
        for(UserFriends i : ul){
            selectedUserIds.add(i.getFid());
        }
        selectedUserIds.add(uid);

        List<User> usersNotInList = userRepository.findUsersNotInList(selectedUserIds);

        for (User i :usersNotInList){
            System.out.println(i.getName());
        }


        return usersNotInList .stream()
                .filter(user -> !user.getRole().equals(Role.ADMIN) && !user.getRole().equals(Role.TEACHER))
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());

        
    }
    //Tasks Teacher
    @Override
    public List<TasksResponse> getAllTeacherTasksNc(Long uid){
        User users = userRepository.findById(uid).get();
        List<Tasks> t = users.getTasks();

        return t.stream()
                .filter(task -> !task.isStatus())
                .map(this::mapToTasksResponse)
                .collect(Collectors.toList());
    }
    
    private UserResponse mapUserToUserResponse(User user) {
        return UserResponse.builder()
                .uid(user.getUid())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .isEnabled(user.getIsEnabled())
                .build();
    }

    private TasksResponse mapToTasksResponse(Tasks tasks){
        return TasksResponse.builder()
                .tid(tasks.getTid())
                .sid(tasks.getSid())
                .description(tasks.getDescription())
                .task(tasks.getTask())
                .status(tasks.isStatus())
                .build();
    }
    

}
