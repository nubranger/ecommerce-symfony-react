import React from 'react';
import {Container} from "reactstrap";
import {Link} from "react-router-dom";
import {useProfileContext} from "../context/profile_context";

const HeaderTop = () => {
    const {openProfileBar} = useProfileContext();

    return (
        <div className="header__top">
            <Container>
                <div className="header__top-con">
                    <div className="header__top-con-contact">
                        <div className="header__top-con-contact-email">
                            <i className="bi bi-envelope-fill"/>
                            <span>mymail@email.com</span>
                        </div>
                        <div className="header__top-con-contact-phone">
                            <i className="bi bi-telephone-fill"/>
                            <span>+370 697 7777777</span>
                        </div>
                    </div>
                    <div className="header__top-con-profile">
                        <i className="secondary bi bi-person-circle"
                           onClick={openProfileBar}/>
                        <Link to="/cart">
                            <i className="bi bi-bag"/>
                        </Link>
                        {/*{account.username ? <span>{account.username}</span> : <span>Profile</span>}*/}
                    </div>
                    <div className="header__top-con-social">
                        <i className="bi bi-facebook"/>
                        <i className="bi bi-twitter"/>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderTop;
