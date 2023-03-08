import React, { Component } from 'react'
import BookService from '../services/BookService';
import { BsCheckCircleFill,BsFillXCircleFill } from "react-icons/bs";

class CreateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            bookName: '',
            authorName: '',
            genre: '',
            image: ''
        }
        this.changeBookNameHandler = this.changeBookNameHandler.bind(this);
        this.changeAuthorNameHandler = this.changeAuthorNameHandler.bind(this);
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            BookService.getBookById(this.state.id).then( (res) =>{
                let book = res.data;
                this.setState({
                    bookName: book.bookName,
                    authorName: book.authorName,
                    genre : book.genre,
                    image : book.image
                });
            });
        }        
    }
    saveOrUpdateBook = (e) => {
        e.preventDefault();
        let book = {
            bookName: this.state.bookName, 
            authorName: this.state.authorName, 
            genre: this.state.genre, 
            image: this.state.image
        };
        console.log('book => ' + JSON.stringify(book));

        // step 5
        if(this.state.id === '_add'){
            BookService.createBook(book).then(res =>{
                this.props.history.push('/mink');
            });
        }
        else{
            BookService.updateBook(book, this.state.id).then( res => {
                this.props.history.push('/mink');
            });
        }
    }
    
    changeBookNameHandler= (event) => {
        this.setState({bookName: event.target.value});
    }

    changeAuthorNameHandler= (event) => {
        this.setState({authorName: event.target.value});
    }

    changeGenreHandler= (event) => {
        this.setState({genre: event.target.value});
    }
    changeImageHandler= (event) => {
        this.setState({image: event.target.value});
    }

    cancel(){
        this.props.history.push('/mink');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center p-4 m-2 text-info">Include</h3>
        }
        else{
            return <h3 className="text-center p-4 m-2 text-info">Update</h3>
        }
    }
    render() {
        return (
            <div id="see">
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Book Name: </label>
                                            <input placeholder="Book Name" name="bookName" className="form-control" 
                                                value={this.state.bookName} onChange={this.changeBookNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Author Name: </label>
                                            <input placeholder="Author Name" name="authorName" className="form-control" 
                                                value={this.state.authorName} onChange={this.changeAuthorNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Genre: </label>
                                            <input placeholder="Genre" name="genre" className="form-control" 
                                                value={this.state.genre} onChange={this.changeGenreHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Image: </label>
                                            <input placeholder="Image Url" name="image" className="form-control" 
                                                value={this.state.image} onChange={this.changeImageHandler}/>
                                        </div>
                                        <div className='btn-group'>
                                        <button className="btn btn-success w-auto" onClick={this.saveOrUpdateBook}><BsCheckCircleFill/> Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><BsFillXCircleFill/> Cancel</button>
                                        </div> 
                                         
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateBookComponent
