package com.learnershigh.dto.lessonhub;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SatiResultDto {


    private int oneCnt;
    private int twoCnt;
    private int threeCnt;
    private int fourCnt;
    private int fiveCnt;

    private double totalCnt;

    private double result;

    public SatiResultDto(int oneCnt, int twoCnt, int threeCnt, int fourCnt, int fiveCnt, double totalCnt, double result) {
        this.oneCnt = oneCnt;
        this.twoCnt = twoCnt;
        this.threeCnt = threeCnt;
        this.fourCnt = fourCnt;
        this.fiveCnt = fiveCnt;
        this.totalCnt = totalCnt;
        this.result =result;
    }
}
