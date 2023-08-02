package com.learnershigh.dto.etc;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CustomResponseBody<T> extends BaseResponseBody{
    private List<T> list;
    private int resultCode;
    private String resultMsg;
    public CustomResponseBody() {
        this.list = new ArrayList<>();
    }

    public CustomResponseBody(String resultMsg) {
        this.resultCode = 0;
        this.resultMsg = resultMsg;
        this.list = new ArrayList<>();
    }
}
