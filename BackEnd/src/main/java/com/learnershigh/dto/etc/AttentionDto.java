package com.learnershigh.dto.etc;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown=true)
@Getter
@Setter
public class AttentionDto {

        public Id id;
        public float avg_value;

        @JsonIgnoreProperties(ignoreUnknown=true)
        @Data
        public class Id {
            public Date min;
            public Date max;
        }



}
