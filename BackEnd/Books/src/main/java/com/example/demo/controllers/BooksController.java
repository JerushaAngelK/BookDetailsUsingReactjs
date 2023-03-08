package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Books;

import com.example.demo.repository.BooksRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/all/")
public class BooksController {
	@Autowired
	private BooksRepository rep;
//	@Autowired
//	BooksService ser;
	
	@GetMapping("/mink")
	public List<Books> getList(){
		return rep.findAll();	
	}
	
	@GetMapping("/mink/{id}")
	public ResponseEntity<Books> getBookById(@PathVariable int id) {
		Books book = rep.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
		return ResponseEntity.ok(book);
	}
	
	@PostMapping("/mink")
	public Books create(@RequestBody Books book) {
		return rep.save(book);
		
	}
	
	@PutMapping("/mink/{id}")
	public ResponseEntity<Books> updateBook(@PathVariable int id, @RequestBody Books book){
		Books boo = rep.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
		
		boo.setBookName(book.getBookName());
		boo.setAuthorName(book.getAuthorName());
		boo.setGenre(book.getGenre());
		boo.setImage(book.getImage());
		Books updatedBook = rep.save(boo);
		return ResponseEntity.ok(updatedBook);
	}
	
	
	@DeleteMapping("/mink/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable int id){
		Books boo = rep.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Book not exist with id :" + id));
		
		rep.delete(boo);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
//	@PutMapping("/mink")
//	public String update(@RequestBody Books book) {
//		return ser.update(book);
//	}
//
//	@DeleteMapping("/mink")
//	public String delete(@RequestParam int id ) {
//		return ser.delete(id);
//	}
}
