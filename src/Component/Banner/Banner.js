import React from 'react';
import everybook from '../Images/EveryBook.jpg';
import sofaBook from '../Images/SofaAndBook.jpg';
import chetan from '../Images/ChetanBhagat.jpg';
import jkrowling from '../Images/JkRowling.jpg';
import pauloCoelho from '../Images/PauloCoelho.jpg';
import bookGenres from '../Images/book-genres.jpg';
import science from '../Images/science.jpg';
import webd from '../Images/web-development.jpg';
import './Banner.css';
export default class Banner extends React.Component{
    render(){
        return(
            <>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mx-auto mt-2">
                        <img className="card-img-top cover" src={sofaBook} alt="cap1" height="200"/>            
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mx-auto mt-2 ">
                        <img className="card-img-top cover" src={everybook} alt="cap2" height="200"/>            
                </div>
            </div>
            <hr></hr>
            <div className="row ">
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={chetan} alt="cap3" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={jkrowling} alt="cap3" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={pauloCoelho} alt="cap4" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={bookGenres} alt="cap5" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={webd} alt="cap6" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={science} alt="cap7" height="200"/>            
                            </div>
                        </div>
            </div>  
            <hr></hr>          
            </>
        )
    }
}

