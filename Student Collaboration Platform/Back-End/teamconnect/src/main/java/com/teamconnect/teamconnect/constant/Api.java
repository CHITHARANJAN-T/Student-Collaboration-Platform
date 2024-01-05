package com.teamconnect.teamconnect.constant;

import java.util.Arrays;
import java.util.List;

public class Api {
    public static final String DEFAULT = "http://localhost:8080";
    public static final String AUTH = "/api/v1/auth";
    public static final String USER = "/api/v1/user";
    public static final String PROJECT = "/api/v1/project";
    public static final String TASKS = "/api/v1/task";
    public static final String FEEDBACK = "/api/v1/feedback";
    public static final String COMMUNTIY = "/api/v1/community";
    public static final String USER_PROJECTS = "/api/v1/userprojects";
    public static final List<String> HEADERS = Arrays.asList("Authorization", "Content-Type");
    public static final List<String> METHODS = Arrays.asList("GET", "POST", "PUT", "DELETE");
    public static final List<String> ORIGINS = Arrays.asList("http://localhost:3000");
}
