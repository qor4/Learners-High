package com.learnershigh.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


@JsonIgnoreProperties(ignoreUnknown=true)
@Data
public class KaKaoDto {

    // 아이디, 이메일, profileimg
    public String id;
    public Properties properties;
    public Kakao_account kakao_account;

    @JsonIgnoreProperties(ignoreUnknown=true)
    @Data
    public class Properties {
        public String nickname;
        public String thumbnail_image;
    }


    @JsonIgnoreProperties(ignoreUnknown=true)
    @Data
    public class Kakao_account {
        public String email;
    }


}
