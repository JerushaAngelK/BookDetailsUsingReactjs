package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Books;
import com.example.demo.repository.BooksRepository;

@Service

public class BooksService {
    @Autowired
	BooksRepository rep;
    
    public String update(Books book) {
		rep.save(book);
		return "Updated";
    }
    public String delete(int id) {
    	if(rep.existsById(id)) {
    		rep.deleteById(id);
    		return "Deleted";	
    	}
    	else {
    		return "No Such Id Exists";
    	}
    }
	
}
