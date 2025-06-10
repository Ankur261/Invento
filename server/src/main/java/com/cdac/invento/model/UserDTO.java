package com.cdac.invento.model;

import lombok.Builder;
import lombok.Data;
import com.cdac.invento.model.User.Role;

@Data
@Builder
public class UserDTO {
    private Long id;      
    private String name;
    private String email;
    private String password;
    private Role role;
    private String address;
}
