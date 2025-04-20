package com.collegeolx.collegeolx.repository;

import com.collegeolx.collegeolx.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{ 'status' : ?0 }")
    List<Product> findByStatus(String status);
    
    @Override
    List<Product> findAll();
}