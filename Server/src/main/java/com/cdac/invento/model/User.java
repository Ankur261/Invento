//package com.cdac.invento.model;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import java.util.List;
//
//@Entity
//@Data
//@Table(name = "users")
//public class User {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    
//    private String name;
//    private String email;
//    private String address;
//    private String password;
//    
//    @Enumerated(EnumType.STRING)
//    private Role role;
//    
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Order> orders;
//    
//    public enum Role {
//        ADMIN, USER
//    }
//}

package com.cdac.invento.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(length = 500)
    private String address;

    public enum Role {
        ADMIN, CUSTOMER
    }
}
