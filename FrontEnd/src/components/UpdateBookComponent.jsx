import React, { Component } from 'react'
import BookService from '../services/BookService';

class UpdateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            bookName: '',
            authorName: '',
            genre: '',
            image:''
        }
        this.changeBookNameHandler = this.changeBookNameHandler.bind(this);
        this.changeAuthorNameHandler = this.changeAuthorNameHandler.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    componentDidMount(){
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

    updateBook = (e) => {
        e.preventDefault();
        let book = {
            bookName: this.state.bookName,
             authorName: this.state.authorName, 
             genre: this.state.genre, 
             image: this.state.image};
        console.log('book => ' + JSON.stringify(book));
        console.log('id => ' + JSON.stringify(this.state.id));
        BookService.updateBook(book, this.state.id).then( res => {
            this.props.history.push('/mink');
        });
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

    render() {
        return (
            <div id="see">
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Book Name: </label>
                                            <input placeholder="Book Name" name="bookName" className="form-control" 
                                                value={this.state.bookName} onChange={this.changeBookNameHandler}/>
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
                                            <label> Img Url: </label>
                                            <input placeholder="Img Url" name="image" className="form-control" 
                                                value={this.state.image} onChange={this.changeImageHandler}/>
                                        </div>
                                       

                                        <button className="btn btn-success" onClick={this.updateBook}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Reset</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateBookComponent
