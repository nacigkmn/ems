package com.example.emp.service;

import com.example.emp.dto.EmployeeDto;
import com.example.emp.entity.Employee;
import com.example.emp.exception.ResourceNotFoundException;
import com.example.emp.mapper.EmployeeMapper;
import com.example.emp.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.ReadOnlyFileSystemException;
import java.util.List;

@AllArgsConstructor
@Service
public class EmployeeServiceImp implements EmployeeService {

    private EmployeeRepository employeeRepository;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employeeToSave = EmployeeMapper.mapToEmployee(employeeDto);
        Employee employee = employeeRepository.save(employeeToSave);
        return EmployeeMapper.mapToDto(employee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id: " + id));
       return EmployeeMapper.mapToDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

            return employees.stream()
                .map((employee)->EmployeeMapper.mapToDto(employee))
                .toList();
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto) {

        Employee employeeToUpdate = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeToUpdate.setFirstName(employeeDto.getFirstName());
        employeeToUpdate.setLastName(employeeDto.getLastName());
        employeeToUpdate.setEmail(employeeDto.getEmail());
        employeeToUpdate.setDateOfEmployment(employeeDto.getDateOfEmployment());
        employeeToUpdate.setDateOfBirth(employeeDto.getDateOfBirth());
        employeeToUpdate.setImagePath(employeeDto.getImagePath());

        Employee employee = employeeRepository.save(employeeToUpdate);

        return EmployeeMapper.mapToDto(employee);
    }

    @Override
    public String deleteEmployee(Long id) {
        Employee employeeToDelete =  employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employeeToDelete);

        return "Employee has been deleted";
    }
}
