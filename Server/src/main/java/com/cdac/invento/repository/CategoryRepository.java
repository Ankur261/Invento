package com.cdac.invento.repository;

import com.cdac.invento.model.CategoryTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryTable, String> {
    Optional<CategoryTable> findByName(String name);  // This is correct for querying by name
}
