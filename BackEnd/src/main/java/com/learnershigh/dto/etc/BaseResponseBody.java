package com.learnershigh.dto.etc;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseResponseBody {
    protected int resultCode;
    protected String resultMsg;

    public BaseResponseBody(String resultMsg) {
        this.resultCode = 0;
        this.resultMsg = resultMsg;
    }
}
