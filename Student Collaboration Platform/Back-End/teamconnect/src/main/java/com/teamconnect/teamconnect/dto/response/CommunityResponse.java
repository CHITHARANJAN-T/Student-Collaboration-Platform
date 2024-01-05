package com.teamconnect.teamconnect.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommunityResponse {
    private long cid;
    private long uid;
    private String username,message;
}
