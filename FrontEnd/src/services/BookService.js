import axios from 'axios';
import { Component } from 'react';

const BOOK_API_BASE_URL = "http://localhost:8080/api/all/mink"  ;

class BookService extends Component{

    getBooks(){
        return axios.get(BOOK_API_BASE_URL);
    }

    createBook(book){
        return axios.post(BOOK_API_BASE_URL, book);
    }

    getBookById(bookId){
        return axios.get(BOOK_API_BASE_URL + '/' + bookId);
    }
 
    updateBook(book,bookId){
        return axios.put(BOOK_API_BASE_URL + '/' + bookId,book);
    }

    deleteBook(bookId){
        return axios.delete(BOOK_API_BASE_URL + '/' + bookId);
    }
}

export default new BookService();