package com.cdac.invento.controller;


import com.cdac.invento.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/names")
    public List<String> getAllCategoryNames() {
        return categoryService.getAllCategoryNames();
    }
}

