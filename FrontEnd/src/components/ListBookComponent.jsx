import React, { Component } from 'react'
import BookService from '../services/BookService'
import { BsFillTrashFill,BsPencilFill,BsFillEyeFill,BsFillPlusCircleFill } from "react-icons/bs";

class ListBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                books: []
        }
        this.addBook = this.addBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    deleteBook(id){
        BookService.deleteBook(id).then( res => {
            this.setState({books: this.state.books.filter(book => book.id !== id)});
        });
    }
    viewBook(id){
        this.props.history.push(`/view/${id}`);
    }
    editBook(id){
        this.props.history.push(`/edit/${id}`);
    }

    componentDidMount(){
        BookService.getBooks().then((res) => {
            this.setState({ books: res.data});
        });
    }

    addBook(){
        this.props.history.push('/add/_add');
    }

    render() {
        return (
            <div id="see">
                 <div className = "row mt-4">
                    <button className="btn btn-primary pt-2 pb-2 float-right" onClick={this.addBook}><BsFillPlusCircleFill/>  Include </button>
                 </div>
                 <br></br>
                 <div className = "card p-5 row cardshadow3">
                        <table className = "table table-bordered">

                            <thead>
                                <tr>
                                    <th className='text-center'> Cover </th>
                                    <th className='text-center'> Book Name</th>
                                    <th className='text-center'> Author Name</th>
                                    <th className='text-center'> Genre</th>
                                    {/* <th className='text-center'> Image </th> */}
                                    <th className='text-center'> CRUD Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.books.map(
                                        book => 
                                        <tr key = {book.id}>
                                             <td className='text-center'><img src={book.image} className="profile-image" alt="dynamic" /></td>
                                             <td> {book.bookName} </td>   
                                             <td> {book.authorName}</td>
                                             <td> {book.genre}</td>
                                             <td className='text-center'>
                                                 <button onClick={ () => this.viewBook(book.id)} className="btn-hover btn-hover-x color-1"><BsFillEyeFill/></button>
                                                 <button onClick={ () => this.editBook(book.id)} className="ml-2 btn-hover btn-hover-x color-7"><BsPencilFill/></button>
                                                 <button onClick={ () => this.deleteBook(book.id)} className="ml-2 btn-hover btn-hover-x color-11"><BsFillTrashFill/> </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListBookComponent
