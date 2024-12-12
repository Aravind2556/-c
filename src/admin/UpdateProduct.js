import React, {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AdminHeader from './AdminNavbar'
import { DataContext } from '../context/DataContext'
import SlowLoader from '../components/SlowLoader'
import ImageThumb from '../assets/UploadPhoto.png'

const UpdateProduct = () => {

    const [isAdmin, setIsAdmin] = useState(null)
    const [Loader, setLoader] = useState(false)
    const [updationLoader, setUpdationLoader] = useState(false)
    const [uploadSpinner, setUploadSpinner] = useState([false, false, false, false])
    const [imageStatus, setImageStatus] = useState([false, false, false, false])
    const [imageFile, setImageFile] = useState([null, null, null, null])
    const [prevImg, setPrevImg] = useState([null, null, null, null])
    const [productUpdate, setProductUpdate] = useState(false)
    const [loaderMsg, setLoaderMsg] = useState('Updation Initiated...')


    useEffect(()=>{
        setLoader(true)
        if(localStorage.getItem("auth-token")){
            fetch('https://skecommerce-backend.onrender.com/userinfo', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(),
            })
            .then((resp) => resp.json())
            .then((data) => {
                setLoader(false)
                if(data.success){
                    setIsAdmin(data.User.isAdmin)
                }else{
                    setIsAdmin(false)
                    if('redirect' in data && data.redirect === true){
                        alert('You have have access to view this page!')
                        window.location.href='/'
                    }else{
                        alert(data.message)
                    }
                }
            })
            .catch((error) => {
                setLoader(false)
                alert('Error connecting to the Server!, Please contact developer.')
                console.error('Error fetching user info: ', error);
            })
        }else{
            setLoader(false)
            alert('You have have access to view this page!')
            window.location.href='/'
        }
    }, [])

    const {Products} = useContext(DataContext)
    const {productId} = useParams()

    const [Product, setProduct] = useState([])

    const [productData, setProductData] = useState({
        id: Number(productId),
        title: Product?Product.name:'',
        description: Product?Product.description:'',
        category: Product?Product.category:'',
        rating:  Product?Product.rating:'',
        actualPrice: Product?Product.actualPrice:'',
        offerPrice: Product?Product.offerPrice:'',
        isBestSeller: Product?Product.isBestSeller:'',
        availability: Product?Product.availability:'',
        images: Product?Product.images:'',
    })

    useEffect(()=>{
        if(Products!==null)
            setProduct(Products.find((e)=>e.id===Number(productId)))
    },[Products])

    useEffect(()=>{
        setProductData({
            id: Number(productId),
            title: Product?Product.name:'',
            description: Product?Product.description:'',
            category: Product?Product.category:'',
            rating:  Product?Product.rating:'',
            actualPrice: Product?Product.actualPrice:'',
            offerPrice: Product?Product.offerPrice:'',
            isBestSeller: Product?Product.isBestSeller:'',
            availability: Product?Product.availability:'',
            images: Product?Product.images:''
        })
    },[Product])
    

    const deleteImage = (url, i, resolve, reject) => {

        const publicId = url.split('/').slice(-1)[0].split('.')[0]
        
        fetch(`https://skecommerce-backend.onrender.com/deleteImage`,{
            method: 'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json',
                'auth-token':`${localStorage.getItem("auth-token")}`
            },
            body: JSON.stringify({ public_id: publicId })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setLoaderMsg(`Deleted the previous Image ${i+1}`)
                resolve()
            }else{
                console.log('Failed Deletion: ',data.message)
                reject()
            }
        })
        .catch(err=>{
            alert('Error occured in deleting previous Image!')
            console.log('Error in deleting Image: ',err)
            reject()
        })
    }



    const updateProduct = async ()=> {

        setLoaderMsg('Final Step in Updation...')

        setLoader(true)

        const form = document.getElementById("product-form")

        if(form){
            if(form.checkValidity()){
                if(isAdmin!==null && isAdmin===true){

                    fetch('https://skecommerce-backend.onrender.com/updateproduct', {
                        method: 'POST',
                        headers: {
                        Accept:'application/json',
                        'Content-Type': 'application/json',
                        'auth-token':`${localStorage.getItem("auth-token")}`
                        },
                        body: JSON.stringify({productData: productData, productId: productId})
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        if(data.success){
                            setLoaderMsg('Product updated Successfully!')
                            setUpdationLoader(false)
                            setLoader(false)
                            alert(data.message)
                            window.location.href='/admin/products';
                        }else{
                            setLoader(false)
                            if('redirect' in data && data.redirect===true){
                                alert('You dont have access to this page!')
                                window.location.href="/"
                            }else{
                                alert(data.message)
                            }
                        }
                    }).catch(error=>{
                        setLoader(false)
                        console.log('Error found on product update, contact developer: ',error)
                    })


                }else{
                    alert('You dont have access to view this page!')
                    window.location.href='/'
                }
            }else{
                setLoader(false)
                form.classList.add("was-validated")
            }
        }else{
            setLoader(false)
            alert('Invalid Form, please contact developer.')
        }
    }



    useEffect(()=>{
        if(productUpdate){
            console.log('Prev Img: ',prevImg)
            const checkUpdate = prevImg.every((data, i)=>{
                if(imageStatus[i]===true && data!==null){
                    return true
                }
                else if(imageStatus[i]===false && data===null){
                    return true
                }
                else{
                    return false
                }
            })

            if(checkUpdate){
                setLoaderMsg('Preparing the previous Images for deletion...')
                const promises = prevImg.map((data, i)=>{
                    return new Promise((resolve, reject)=>{
                        if(data!==null){
                            deleteImage(data, i, resolve, reject)
                        }else{
                            resolve()
                        }
                    })
                })

                Promise.all(promises).then(()=>{
                    setLoaderMsg('Deleted the previous Images...')
                    updateProduct()
                })
            }
        }
    },[prevImg, productUpdate])

    const uploadImage = (file, i, resolve, reject) => {


        const formData = new FormData();
        formData.append('image', file)


        setUploadSpinner(prev=>{
            const newData = [...prev]
            newData[i] = true
            return newData
        })

        fetch('https://skecommerce-backend.onrender.com/uploadImage',{
            method: 'POST',
            headers: {
                'auth-token':`${localStorage.getItem("auth-token")}`,
            },
            body: formData
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setLoaderMsg(`Uploaded the Image ${i+1}`)


                setPrevImg((prev)=>{
                    const Images = [...prev]
                    Images[i] = productData.images[i]
                    return Images
                })

                const imageUrl = data.url

                setUploadSpinner(prev=>{
                    const newData = [...prev]
                    newData[i] = false
                    return newData
                })

                setProductData((prev) => {
                    const newImages = [...prev.images];
                    newImages[i] = imageUrl;
                    return { ...prev, images: newImages };
                })
                resolve()
            }
            else{
                alert(data.message)
                reject(data.message)
            }
        })
        .catch(err=>{
            alert('You have low Network, please try again later!')
            console.log('Error in uploading Image: ',err)
            reject(err)
        })

    }

    const imageHandler = (e, i) => {

        const file = e.target.files[0];

        setImageStatus((prev)=>{
            const newData = [...prev]
            newData[i] = true
            return newData
        })

        if (file) {
            setImageFile((prev)=>{
                const newData = [...prev]
                newData[i] = file
                return newData
            })
        }

    };


    const handleProductUpdate = async () => {
        setUpdationLoader(true)
        setLoaderMsg('Updation Initiated...')
        const ImgUpdationRequired = imageStatus.some(i=>{return i===true})

        if(ImgUpdationRequired){
            setLoaderMsg('Uploading the Images...')
            
            const promises = imageFile.map((img, i)=>{
                return new Promise((resolve, reject)=>{
                    if(imageStatus[i]===true){
                        uploadImage(img, i, resolve, reject)
                    }
                    else{
                        resolve()
                    }
                })

            })
            Promise.all(promises).then(()=>{
                setLoaderMsg('Uploaded all the Images...')
                setProductUpdate(true)
            })
        }else{
            updateProduct()
        }
    }


    if(Products!==null && isAdmin!==null && isAdmin===true && typeof Product === 'object' && productData.name!=="" && productData.images.length>0){
        return (
            <div className='position-relative'>
                <AdminHeader/>
                <div className='container-fluid'>
                    <div className='row'>
                    <div className='col-md-12'>
                            <div className='w-100 d-flex flex-wrap justify-content-between align-items-center'>
                                <button onClick={()=>{window.location.href='/admin/products'}} className='btn btn-outline-dark rounded-pill my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Products</span><span className='back-home-lg'> Goto Products</span></button>
                                <button type='button' onClick={()=>{handleProductUpdate()}} className='btn btn-primary rounded-pill px-4 py-2 fs-5 my-2'>Update <i className="bi bi-folder-plus"></i></button>
                            </div>
                            <h4 className='text-center my-1'>Update Product</h4><hr/>
                            <div className='user-account-form-container'>
                            <form className='w-100' id="product-form">
                                    <div className='checkout-form-left'>
                                        <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="ProductTitle" className="form-label">Product Title</label>
                                                <input required value={productData.title} onChange={(e)=>setProductData({...productData, title: e.target.value})} type="text" className="form-control" id="ProductTitle" placeholder="Product Title" />
                                            </div>
                                            <div className="my-2" style={{width: '320px'}}>
                                                <label htmlFor="ProductCategory" className="form-label">Product's Category</label>
                                                <select required id='ProductCategory' className="form-select" aria-label="Default select example"  defaultValue={productData.category} onChange={(e)=>setProductData({...productData, category: e.target.value})}>
                                                    <option disabled>Update Category</option>
                                                    <option value="fashion">Fashion</option>
                                                    <option value="homeapplainces">Home Applainces</option>
                                                </select>
                                            </div>
                                            
                                            <div className="my-2"  style={{width: '320px'}}>
                                                <label className="form-label" htmlFor="ProductDescription">Product Description</label>
                                                <textarea required value={productData.description} onChange={(e)=>setProductData({...productData, description: e.target.value})} className="form-control" placeholder="Enter the Products Description here" id="ProductDescription"></textarea>
                                            </div>
                                            <div className='d-flex flex-wrap justify-content-evenly align-items-center w-100'>
                                                <div className="my-2" style={{width: '320px'}}>
                                                    <label htmlFor="ProductRating" className="form-label">Product Rating</label>
                                                    <input required value={productData.rating} onChange={(e)=>setProductData({...productData, rating: e.target.value})} type="number" min='1' max='5' className="form-control" id="ProductRating" placeholder="4.5" />
                                                </div>
                                                <div className="my-2" style={{width: '320px'}}>
                                                    <label htmlFor="ProductActualPrice" className="form-label"><i className="bi bi-currency-rupee"></i> Actual Price</label>
                                                    <input required value={productData.actualPrice} onChange={(e)=>setProductData({...productData, actualPrice: e.target.value})} type="number" className="form-control" id="ProductActualPrice" placeholder="150" />
                                                </div>
                                                <div className="my-2" style={{width: '320px'}}>
                                                    <label htmlFor="ProductOfferPrice" className="form-label"><i className="bi bi-currency-rupee"></i> Offer Price</label>
                                                    <input required value={productData.offerPrice} onChange={(e)=>setProductData({...productData, offerPrice: e.target.value})} type="number" className="form-control" id="ProductOfferPrice" placeholder="99" />
                                                </div>
                                                <div className='d-flex justify-content-evenly align-items-center w-100 my-3'>
                                                    <div className="form-check my-2">
                                                        <label className="form-check-label" htmlFor="ProductBestSeller">Best Seller</label>
                                                        <input checked={productData.isBestSeller} onChange={(e)=>setProductData({...productData, isBestSeller: e.target.checked})} type="checkbox" className="form-check-input" id="ProductBestSeller" />
                                                    </div>
                                                    <div className="form-check my-2">
                                                        <label className="form-check-label" htmlFor="ProductAvailability">Availability</label>
                                                        <input checked={productData.availability} onChange={(e)=>setProductData({...productData, availability: e.target.checked})} type="checkbox" className="form-check-input" id="ProductAvailability"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <h3 className="form-label text-center w-100 m-0 my-2 fw-bold">Product Images</h3>
                                            <div id='ProductImages' className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                                <div>
                                                    <label htmlFor='ProductImage1' className='form-label'><img src={!productData.images[0]?ImageThumb:(productData.images && productData.images.length > 0 ? productData.images[0]:ImageThumb) } alt='upload' style={{height: '150px'}}/><p className='lead text-center'>Img1</p></label>
                                                    <input required={!(productData.images && productData.images.length>0)} onChange={(e)=>{imageHandler(e, 0)}} name='images' type='file' hidden accept='image/*' placeholder='Enter/ Paste an image url' className='form-control' id='ProductImage1'/>
                                                    <div className="invalid-feedback fw-bold">
                                                        * Please upload Image 1
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor='ProductImage2' className='form-label'><img src={!productData.images[1]?ImageThumb:(productData.images && productData.images.length > 1 ? productData.images[1]:ImageThumb) } alt='upload' style={{height: '150px'}}/><p className='lead text-center'>Img2</p></label>
                                                    <input required={!(productData.images && productData.images.length>1)} onChange={(e)=>{imageHandler(e, 1)}} name='images' type='file' hidden accept='image/*' placeholder='Enter/ Paste an image url' className='form-control' id='ProductImage2'/>
                                                    <div className="invalid-feedback fw-bold">
                                                        * Please upload Image 2
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor='ProductImage3' className='form-label'><img src={!productData.images[2]?ImageThumb:(productData.images && productData.images.length > 2 ? productData.images[2]:ImageThumb) } alt='upload' style={{height: '150px'}}/><p className='lead text-center'>Img3</p></label>
                                                    <input required={!(productData.images && productData.images.length>2)} onChange={(e)=>{imageHandler(e, 2)}} name='images' type='file' hidden accept='image/*' placeholder='Enter/ Paste an image url' className='form-control' id='ProductImage3'/>
                                                    <div className="invalid-feedback fw-bold">
                                                        * Please upload Image 3
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor='ProductImage4' className='form-label'><img src={!productData.images[3]?ImageThumb:(productData.images && productData.images.length > 3 ? productData.images[3]:ImageThumb) } alt='upload' style={{height: '150px'}}/><p className='lead text-center'>Img4</p></label>
                                                    <input required={!(productData.images && productData.images.length>3)} onChange={(e)=>{imageHandler(e, 3)}} name='images' type='file' hidden accept='image/*' placeholder='Enter/ Paste an image url' className='form-control' id='ProductImage4'/>
                                                    <div className="invalid-feedback fw-bold">
                                                        * Please upload Image 4
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='checkout-form-right'>
                                        <div className='d-flex flex-wrap justify-content-center'>
                                            <button type='button' onClick={()=>{handleProductUpdate()}} className='btn btn-primary rounded-pill px-4 py-2 fs-5 m-2'>Update <i className="bi bi-folder-plus"></i></button>
                                        </div>
                                    </div>      
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {Loader && <SlowLoader/>}

                {updationLoader && <div className='text-center position-absolute top-50 start-50 translate-middle px-5 py-5 mx-2' style={{background: 'rgba(0, 0, 0, 0.6)'}}>
                    <div>
                        <div className="spinner-border text-light fs-4" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className='display-5 fs-4 m-0 text-light my-2'>Please wait, Product Updation in progress</p>
                    </div>
                    <p className="text-light fs-5 m-0">{loaderMsg}</p>
                </div>}

            </div>
        )
    }else{
        return (
            <div>
                <SlowLoader/>
            </div>
        )
    }

}

export default UpdateProduct