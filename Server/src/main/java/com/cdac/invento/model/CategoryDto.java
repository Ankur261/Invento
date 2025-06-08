package com.cdac.invento.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor 
@AllArgsConstructor 
public class CategoryDto {
    private Long id;
    private String name;
}
