package com.teamconnect.teamconnect.service;

import com.teamconnect.teamconnect.dto.request.AuthenticationRequest;
import com.teamconnect.teamconnect.dto.request.RegisterRequest;
import com.teamconnect.teamconnect.dto.response.AuthenticationResponse;

public interface AuthService {
    boolean userRegistration(RegisterRequest request);

    AuthenticationResponse userAuthentication(AuthenticationRequest request);

    AuthenticationResponse adminAuthentication(AuthenticationRequest request);
}
