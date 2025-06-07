package com.cdac.invento.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "category_table")
public class CategoryTable {

    @Id
    @Column(name = "Name", length = 500)
    private String name;

    @Column(name = "ID", unique = true)
    private Integer id;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Product> products;

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
