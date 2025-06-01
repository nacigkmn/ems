package com.example.emp.controller;



import com.example.emp.dto.EmployeeDto;
import com.example.emp.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;


@CrossOrigin("http://localhost:3001")
@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService  employeeService;

    //save employee

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
     EmployeeDto employeeToSave = employeeService.createEmployee(employeeDto);
     return new ResponseEntity<>(employeeToSave, HttpStatus.CREATED);
    }


    @PostMapping("/upload")
    public ResponseEntity<EmployeeDto> uploadEmployeeWithImage(
            @RequestPart("employee") String employeeJson,
            @RequestPart("image") MultipartFile imageFile) throws IOException {


        ObjectMapper objectMapper = new ObjectMapper();
        EmployeeDto employeeDto = objectMapper.readValue(employeeJson, EmployeeDto.class);

        String uploadDir = "uploads/";
        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, imageFile.getBytes());


        employeeDto.setImagePath(filePath.toString());


        EmployeeDto saved = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long id){
        EmployeeDto employeeDto = employeeService.getEmployeeById(id);
        return new  ResponseEntity<>(employeeDto, HttpStatus.OK);
}



    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployeeWithImage(
            @PathVariable Long id,
            @RequestPart("employee") String employeeJson,
            @RequestPart("image") MultipartFile imageFile) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        EmployeeDto employeeDto = objectMapper.readValue(employeeJson, EmployeeDto.class);

        String uploadDir = "uploads/";
        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, imageFile.getBytes());


        employeeDto.setImagePath(filePath.toString());


        EmployeeDto updated = employeeService.updateEmployee(id, employeeDto);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id){
        employeeService.deleteEmployee(id);
        return new  ResponseEntity<>("Employee has been deleted", HttpStatus.OK);
    }
}
