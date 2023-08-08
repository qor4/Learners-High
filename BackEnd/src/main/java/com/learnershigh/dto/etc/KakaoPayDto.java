package com.learnershigh.dto.etc;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoPayDto {

    private String tid;
    private String next_redirect_pc_url;
    private String created_at;
}
