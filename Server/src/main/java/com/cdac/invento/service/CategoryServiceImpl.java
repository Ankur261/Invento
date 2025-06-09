package com.cdac.invento.service;


import com.cdac.invento.repository.CategoryRepository;
import com.cdac.invento.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<String> getAllCategoryNames() {
        return categoryRepository.findAll()
                .stream()
                .map(category -> category.getName())
                .collect(Collectors.toList());
    }
}

