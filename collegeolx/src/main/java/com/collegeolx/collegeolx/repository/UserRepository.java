package com.collegeolx.collegeolx.repository;

import com.collegeolx.collegeolx.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(String role);
    
    @Query("{'email': ?0, 'password': ?1}")
    Optional<User> findByEmailAndPassword(String email, String password);
    
    boolean existsByEmail(String email);
}