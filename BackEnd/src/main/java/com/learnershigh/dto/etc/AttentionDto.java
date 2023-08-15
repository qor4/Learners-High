package com.learnershigh.dto.etc;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class AttentionDto {

    public Id id;
    public Double avgValue;
    public int count0;
    public int count1;
    public int count2;

    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public class Id {
        public Date min;
        public Date max;
    }


}
