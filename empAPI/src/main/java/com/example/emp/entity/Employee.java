package com.example.emp.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id", unique = true, nullable = false)
    private String email;

    @Column(name = "date_of_employment")
    private Date dateOfEmployment;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Column(name = "picture")
    private String imagePath;
}
