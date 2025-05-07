package com.devteria.identityservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SortField implements Serializable {
    private String property;
    private Sort.Direction direction;  //ASC hoặc DESC
}
