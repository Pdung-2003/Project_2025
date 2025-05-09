package com.devteria.identityservice.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VnPayResponse implements Serializable {

    @JsonProperty("Message")
    private String message;

    @JsonProperty("RspCode")
    private String rspCode;
}
