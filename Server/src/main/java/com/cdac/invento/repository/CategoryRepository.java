package com.cdac.invento.repository;



import com.cdac.invento.model.CategoryTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryTable, String> {
}

