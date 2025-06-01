package com.example.emp.mapper;

import com.example.emp.dto.EmployeeDto;
import com.example.emp.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDateOfEmployment(),
                employee.getDateOfBirth(),
                employee.getImagePath()

        );
    }


    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                employeeDto.getDateOfEmployment(),
                employeeDto.getDateOfBirth(),
                employeeDto.getImagePath()
        );
    }
}
