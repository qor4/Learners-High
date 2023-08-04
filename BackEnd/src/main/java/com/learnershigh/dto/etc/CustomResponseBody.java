package com.learnershigh.dto.etc;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CustomResponseBody<T> extends BaseResponseBody {
    private int resultCode;
    private String resultMsg;
    private Object result;

    public CustomResponseBody() {
        this.result = new Object();
    }

    public CustomResponseBody(String resultMsg) {
        this.resultCode = 0;
        this.resultMsg = resultMsg;
    }
}
