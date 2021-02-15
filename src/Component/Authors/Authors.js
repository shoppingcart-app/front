import React from 'react';
import './Authors.css';
import Aux from '../../hoc/Auxiliary.js';
export default class Authors extends React.Component{
    render(){
        return(
            <Aux>
                <div className="col-12 divnames divnamesAuthors"><h4>Featured Authors...</h4></div>
                <div className="row">
                    <div className="col-lg-2 col-md-4 col-sm-6 authorimg">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/042020/XCM_Manual_1222432_1160164_IN_IN_Book_HOMEPAGE_Graphics_Authors_96b8367a_d645_40b9_b7ec_1b6ed2b4874b_440x300_null_en_IN.jpg" alt="Chetan Bhagat" />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 authorimg">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/042020/XCM_Manual_1222432_1160165_IN_IN_Book_HOMEPAGE_Graphics_Authors_906c1d61_8d80_4350_8cef_e46a949f9306_440x300_null_en_IN.jpg" alt="Agatha Christie" />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 authorimg">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/042020/XCM_Manual_1222432_1160166_IN_IN_Book_HOMEPAGE_Graphics_Authors_6b476da1_e203_40aa_9b2c_f104e95d38f9_440x300_null_en_IN.jpg" alt="Paulo Coelho" />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 authorimg">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/042020/XCM_Manual_1222432_1160167_IN_IN_Book_HOMEPAGE_Graphics_Authors_9a02e4d1_01b7_4295_9ab4_8775767b1875_440x300_null_en_IN.jpg" alt="Jeffrey Archer" />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 authorimg">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/042020/XCM_Manual_1222432_1160168_IN_IN_Book_HOMEPAGE_Graphics_Authors_94c4f4b9_5cf0_4ac6_8cd6_10e361a5011b_440x300_null_en_IN.jpg" alt="Robin Sharma" />
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 authorimg">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Books/042020/XCM_Manual_1222432_1160169_IN_IN_Book_HOMEPAGE_Graphics_Authors_40f6ca1f_202e_4905_b965_139cb26ba796_440x300_null_en_IN.jpg" alt="Dan Brown" />
                    </div>
                </div>
            </Aux>
        );
    }
}
