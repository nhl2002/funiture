import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {db} from '../config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {auth} from '../config/Config'
import Logo2 from '../../images/Logo2.jpg'
import '../ProductDetail/ProductDetail.css'



function ProductDetail({user}) {
    const {productID} = useParams()
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [phone, setPhone] = useState('')
    const [content, setContent] = useState('')
    const [time, setTime] = useState('')
    const [image, setImage] = useState()
    const [cate, setCate] = useState('')
    const [posters, setPosters] = useState('')
    // console.log(productID)

    const handleSubmit = () => {
        console.log('Handle')
    }

    const history = useHistory();

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/signIn');
        })
    }

    useEffect(() => {
        const fetchDetailProduct = db.collection("Products").doc(productID).get().then((snapshot) => {
            if (snapshot) {
                setImage(snapshot.data().url)
                setTitle(snapshot.data().title)
                setCate(snapshot.data().categorys)
                setContent(snapshot.data().content)
                setPrice(snapshot.data().price)
                setPhone(snapshot.data().number)
                setTime(new Date(snapshot.data().time.toDate()).toLocaleDateString() + " " + new Date(snapshot.data().time.toDate()).toLocaleTimeString())
                setPosters(snapshot.data().poster)
            }
        })
        return fetchDetailProduct
    }, [])

     
      db.collection('signup').doc(productID).get().then((snapshot) => {
        if(snapshot) {
          console.log(snapshot.data())
        }
      })
      
    

    // db.collection("Products").doc(productID).get().then((snapshot) => {
    // if(snapshot) {
    //     console.log(new Date(snapshot.data().time.toDate()).toUTCString())
    // }
    // })


    return (
        <>
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
            
            <div className='ProductDetail'>
                <div className='ProductDetail__content'>
                    <div className='ProductDetail__pic'>
                        <img style={
                                {
                                    width: 600,
                                    height: 600,
                                    objectFit: 'cover'
                                }
                            }
                            src={image}
                            alt=""/>
                    </div>
                    <div className='ProductDetail__present'>
                        <div className='ProductDetail__title'>
                            <h1 className='ProductDetail__text'>
                                {title}</h1>
                        </div>

                        <div className='ProductDetail__category'>Danh mục sản phẩm : {cate}</div>

                        <div className='ProductDetail__contents'>Nội dung : {content}</div>

                        <div className='ProductDetail__price'>Giá sản phẩm: {price}
                            đ</div>

                        <div className='ProductDetail__protected'>Bảo hiểm : Furnie chịu trách nhiệm bảo hiểm sản phẩm với những giao dịch trên sàn Furnie</div>

                        <div className='ProductDetail__delivery'>
                            <div className='ProductDetail__text'>
                                Vận chuyển :
                            </div>

                            <div className='ProductDetail__option'>
                                <p className='ProductDetail__option-item'>Nội thành Hà Nội : từ 1 đến 2 ngày</p>
                                <p className='ProductDetail__option-item'>Ngoại thành : từ 3 đến 5 ngày</p>
                                <p className='ProductDetail__option-item'>Phí vận chuyển: Ngoại thành</p>
                            </div>
                        </div>

                        <div className='ProductDetail__length'>Số lượng còn:
                        </div>

                        <div className='ProductDetail__phone'>Số điện thoại : {
                            phone || "Không có"
                        }</div>

                        <div className='ProductDetail__times'>Thời gian đăng : {time}</div>

                        <div>Người đăng : {posters || 'Không tồn tại'}</div>

                        <div className='ProductDetail__submit'>
                            <div className='ProductDetail__add'>
                                <button>Thêm vào giỏ hàng</button>
                            </div>

                            <div className='ProductDetail__buyNow'>
                                <button>Mua ngay</button>
                            </div>

                        </div>

                        <div className='ProductDetail__support'>
                            {
                            phone ? '' : (
                                <button>Hỗ trợ vận chuyển</button>
                            )
                        } </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail
