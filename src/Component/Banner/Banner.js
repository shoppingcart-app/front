import React from 'react';
import everybook from '../Images/EveryBook.jpg';
import sofaBook from '../Images/SofaAndBook.jpg';
import vivo from '../Images/vivo.jpg';
import apple from '../Images/apple.png';
import oneplus from '../Images/oneplus.png';
import oppo from '../Images/oppo.jpg';
import realme from '../Images/realme.jpg';
import samsung from '../Images/samsung.png';
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
                                <img className="card-img-top cover author-img" src={vivo} alt="cap3" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={apple} alt="cap3" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={oneplus} alt="cap4" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={oppo} alt="cap5" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={realme} alt="cap6" height="200"/>            
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 p-1">
                            <div className="card bannercard">
                                <img className="card-img-top cover author-img" src={samsung} alt="cap7" height="200"/>            
                            </div>
                        </div>
            </div>  
            <hr></hr>          
            </>
        )
    }
}

