import React from 'react'
import Logo2 from '../../images/Logo2.jpg'
import "../Header/Header.css"
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {auth} from '../config/Config'


function Header({user}) {
    const handleSubmit = () => {
        console.log('Handle')
    }

    const history = useHistory();

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/signIn');
        })
    }

    return (
        <div className='Headers'>
            <div className='Info'>
                <div className='Headers__infomations'>
                    <Link to="/" className='Headers__item1'>Kênh người bán</Link>
                    {"|"}
                    <Link to="/" className='Headers__item2'>Trở thành người bán Furni</Link>
                    {"|"}
                    <Link to="/" className='Headers__item3'>Tải ứng dụng</Link>
                    {"|"}
                    <div className='Headers__group'>
                        <div className='Headers__item4'>Kết nối</div>
                        <a className='Logos' href="">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a className='Logos' href="">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className='Headers_nofi'>
                    <Link to="/" className='Headers__item1'>
                        <i className="fa-solid fa-bell"></i>
                        Thông báo
                    </Link>
                    
                    <Link to="/" className='Headers__item2'>
                        <i className="fa-solid fa-headset"></i>
                        Hỗ trợ
                    </Link>
                </div>
            </div>


            <div className='Headers__containers'>
                <Link to="/">
                    <div className='Headers__logo'>
                        <img className='Headers__img'
                            src={Logo2}
                            alt="Logo"/>
                    </div>
                </Link>

                <div className='Headers__search'>
                    <form className='Headers__forms'
                        onSubmit={handleSubmit}>
                        <input className='Headers__input' placeholder='Tìm với giá tốt trên Furnie' type="text"/>
                        <button type='submit' className='Headers-btn__search'>
                            <i className='fa fa-search'></i>
                        </button>
                    </form>
                </div>

                <Link to="/addProducts">
                    <div className='Headers-product__add'>
                        <i className="fa-solid fa-plus"></i>
                        <div className='Headers-text__add'>Đăng tin</div>
                    </div>
                </Link>

                {
                !user && <div className='Headers__auth'>
                    <Link className='Headers__signUp'>Đăng ký</Link>
                    {"|"}
                    <Link className='Headers__signIn'>Đăng nhập</Link>
                    {"|"}
                    <Link to='/Cart'>
                        <div className='Headers__cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </Link>
                </div>
            }

                {
                user && <div className='Headers__auth'>
                    <Link className='Headers__signUp'
                        onClick={handleLogout}>Đăng xuất</Link>
                    {"|"}
                    <Link className='Headers__signIn'>
                        {user}</Link>
                    {"|"}
                    <Link to='/Cart'>
                        <div className='Headers__cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                    </Link>
                </div>
            } </div>
        </div>
    )
}

export default Header
