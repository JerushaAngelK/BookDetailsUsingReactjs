import React, { Component } from 'react'
import BookService from '../services/BookService'
import { Link } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
class ViewBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {}
        }
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( res => {
            this.setState({book: res.data});
        })
    }

    render() {
        return (
            <div id="see">
                <br></br>
                <div className = "card col-md-6 offset-md-3 cardshadow3 mt-5">
                    <h3 className = "text-center mt-3 text-primary"> Synopsis </h3>
                    <div className = "card-body">
                        <div className="row">
                                <div className="col-5">
                                <img src={this.state.book.image} className="profile-image-x ml-5" alt="dynamic" />
                                </div>
                                <div className="col-7">

                                        <div className = "row">
                                            <label>Book Name : </label>
                                            <div className='ml-2'> { this.state.book.bookName }</div>
                                        </div>
                                        <div className = "row">
                                            <label>Author Name : </label>
                                            <div className='ml-2'> { this.state.book.authorName }</div>
                                        </div>
                                        <div className = "row">
                                            <label>Genre : </label>
                                            <div className='ml-2'> { this.state.book.genre }</div>
                                        </div>
                                </div>
                        </div>
 
                    </div>
                    
                    <Link to='/' className='btn btn-primary mt-2 mb-4'><BsFillArrowLeftCircleFill/> Back To Home</Link>

                </div>
            </div>
        )
    }
}

export default ViewBookComponent
