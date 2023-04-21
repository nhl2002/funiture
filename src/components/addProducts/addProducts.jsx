import React, {useState} from 'react'
import Logo2 from '../../images/Logo2.jpg'
import {Link} from 'react-router-dom'
import {storage, db} from '../config/Config'
import "../addProducts/addProducts.css"
import CurrencyInput from 'react-currency-input-field';
import firebase from 'firebase/compat/app'


function AddProducts({user}) {
    const options = ['Đăng ký giao dịch', 'Đăng ký trực tiếp']
    const [active, setActive] = useState(options[0])
    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')
    const [content, setContent] = useState('')
    const [price, setPrice] = useState('');
    const [categorys, setCategorys] = useState('')
    const [image, setImage] = useState([])
    const [imageError, setImageError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [uploadError, setUploadError] = useState('')
    const [poster, setPoster] = useState('')


    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const validateValue = (value) => {
        const price = value === undefined ? 'undefined' : value;
        setPrice(price);


    };

    const handleProductImage = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile);
                setImageError('');
            } else {
                setImage(null);
                setImageError('Lựa chọn ảnh hợp lệ')
            }
        } else {
            console.log('please select your file');
        }
    }

    const handleAddProducts = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`product-images/${
            image.name
        }`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                db.collection('Products').add({
                    title,
                    content,
                    categorys,
                    price: Number(price),
                    number,
                    url,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    poster: user
                }).then(() => {
                    setSuccessMsg('Đăng tin thành công');
                    setTitle('');
                    setContent('');
                    setCategorys('');
                    setPrice('');
                    setNumber('');
                    setPoster('')
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 3000)
                }).catch(error => setUploadError(error.message));
            })
        })
    }

    console.log(price)


    const handleAddProductsNoPhone = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`product-images/${
            image.name
        }`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                db.collection('Products').add({
                    title,
                    content,
                    categorys,
                    price,
                    url,
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    poster: user
                }).then(() => {
                    setSuccessMsg('Đăng tin thành công');
                    setTitle('');
                    setContent('');
                    setCategorys('');
                    setPrice('');
                    setPoster('')
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 2000)
                }).catch(error => setUploadError(error.message));
            })
        })
    }

    return (
        <>
            <div className='Headers'>
                <div className='Headers__containers no_flex'>
                    <Link to="/">
                        <div className='Headers__logo'>
                            <img className='Headers__img'
                                src={Logo2}
                                alt="Logo"/>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='addProducts__form'>
                <h1 className='addProducts-title__form'>Đăng tin</h1>
                <div className='addProducts__forms'>
                    <div className='addProducts__tabs'>
                        {
                        options.map((option, index) => {
                            return (
                                <button className='button__option'
                                    style={
                                        option === active ? {
                                            backgroundColor: '#495579',
                                            color: '#fff'
                                        } : {}
                                    }
                                    onClick={
                                        () => setActive(option)
                                    }
                                    key={index}>
                                    {option} </button>
                            )
                        })
                    }</div>

                    {
                    active === "Đăng ký giao dịch" ? (
                        <> {
                            successMsg && <>
                                <div className='success-msg'>
                                    {successMsg}</div>
                                <br></br>
                            </>
                        }
                            <form className='formGroup'
                                onSubmit={handleAddProducts}>
                                <div className='flexs'>
                                    <label>Người đăng</label>
                                    <input value={user}
                                        onChange={
                                            (e) => setPoster(e.target.value)
                                        }
                                        type="text"

                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Tên sản phẩm</label>
                                    <input value={title}
                                        onChange={
                                            (e) => setTitle(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Nội dung</label>
                                    <input value={content}
                                        onChange={
                                            (e) => setContent(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Số điện thoại</label>
                                    <input value={number}
                                        onChange={
                                            (e) => setNumber(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Giá</label>
                                    <CurrencyInput allowDecimals={false}
                                        onValueChange={validateValue}
                                        className="form_control"/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Danh mục sản phẩm</label>
                                    <select value={categorys}
                                        onChange={
                                            (e) => setCategorys(e.target.value)
                                        }
                                        className='form_control'>
                                        <option value="">Lựa chọn danh mục</option>
                                        <option>Bàn ghế</option>
                                        <option>Tủ, kệ gia đình</option>
                                        <option>Giường, chăn ga, gối nệm</option>
                                        <option>Bếp, lò, đồ điện nhà bếp</option>
                                        <option>Dụng cụ nhà bếp</option>
                                        <option>Quạt</option>
                                        <option>Cây cảnh, đồ trang trí</option>
                                        <option>Thiết bị vệ sinh, nhà tắm</option>
                                        <option>Nội thất, đồ gia dụng</option>
                                    </select>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Đăng ảnh</label>
                                    <input onChange={handleProductImage}
                                        accept="true"
                                        type="file"
                                        id='file'
                                        className='form_control'
                                        multiple/>
                                </div>

                                {
                                imageError && <>
                                    <br/>
                                    <div className='error-msg'>
                                        {imageError}</div>
                                </>
                            }
                                <br/>
                                <div style={
                                    {
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }
                                }>
                                    <button type='submit' className='btn btn_success'>
                                        Đăng tin
                                    </button>
                                </div>
                            </form>
                            {
                            uploadError && <>
                                <br></br>
                                <div className='error-msg'>
                                    {uploadError}</div>
                            </>
                        } </>
                    ) : ""
                }

                    {
                    active === "Đăng ký trực tiếp" ? (
                        <> {
                            successMsg && <>
                                <div className='success-msg'>
                                    {successMsg}</div>
                                <br></br>
                            </>
                        }
                            <form className='formGroup'
                                onSubmit={handleAddProductsNoPhone}>
                                <div className='flexs'>
                                    <label>Người đăng</label>
                                    <input value={user}
                                        onChange={
                                            (e) => setPoster(e.target.value)
                                        }
                                        type="text"

                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Tên sản phẩm</label>
                                    <input value={title}
                                        onChange={
                                            (e) => setTitle(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Nội dung</label>
                                    <input value={content}
                                        onChange={
                                            (e) => setContent(e.target.value)
                                        }
                                        type="text"
                                        className='form_control'/>
                                </div>


                                <br/>
                                <div className='flexs'>
                                    <label>Giá</label>
                                    <CurrencyInput allowDecimals={false}
                                        onValueChange={validateValue}
                                        className="form_control"/>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Danh mục sản phẩm</label>
                                    <select value={categorys}
                                        onChange={
                                            (e) => setCategorys(e.target.value)
                                        }
                                        className='form_control'>
                                        <option value="">Lựa chọn danh mục</option>
                                        <option>Bàn ghế</option>
                                        <option>Tủ, kệ gia đình</option>
                                        <option>Giường, chăn ga, gối nệm</option>
                                        <option>Bếp, lò, đồ điện nhà bếp</option>
                                        <option>Dụng cụ nhà bếp</option>
                                        <option>Quạt</option>
                                        <option>Cây cảnh, đồ trang trí</option>
                                        <option>Thiết bị vệ sinh, nhà tắm</option>
                                        <option>Nội thất, đồ gia dụng</option>
                                    </select>
                                </div>
                                <br/>
                                <div className='flexs'>
                                    <label>Đăng ảnh</label>
                                    <input onChange={handleProductImage}
                                        type="file"
                                        id='file'
                                        className='form_control'/>
                                </div>

                                {
                                imageError && <>
                                    <br/>
                                    <div className='error-msg'>
                                        {imageError}</div>
                                </>
                            }
                                <br/>
                                <div style={
                                    {
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }
                                }>
                                    <button type='submit' className='btn btn_success'>
                                        Đăng tin
                                    </button>
                                </div>
                            </form>
                            {
                            uploadError && <>
                                <br></br>
                                <div className='error-msg'>
                                    {uploadError}</div>
                            </>
                        } </>
                    ) : ""
                } </div>
            </div>
        </>

    )
}

export default AddProducts
