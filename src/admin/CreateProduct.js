import React, {useState, useEffect, useRef} from 'react'
import AdminHeader from './AdminNavbar'
import PhotoUpload from '../assets/UploadPhoto.png'
import PhotoUploaded from '../assets/UploadedPhoto.png'
import SlowLoader from '../components/SlowLoader'

const CreateProduct = () => {

    const [isAdmin, setIsAdmin] = useState(null)
    const [Loader, setLoader] = useState(false)
    const [uploadSpinner, setUploadSpinner] = useState([false, false, false, false])
    const [productCreate, setProductCreate] = useState(false)
    const [updationLoader, setUpdationLoader] = useState(false)
    const [loaderMsg, setLoaderMsg] = useState('Creation Initiated...')
    const formRef = useRef(null)


    useEffect(()=>{
        setLoader(true)
        if(localStorage.getItem('auth-token')){
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
                    alert(data.message)
                }
            })
            .catch((error) => {
                setLoader(false)
                alert('Error connecting to the Server when fetching User info!, Please try again later.')
                console.error('Error fetching user info: ', error);
            })
        }else{
            alert('You dont have access to this Page!')
            window.location.href="/"
        }
    }, [])


    const [productDetails,setProductDetails] = useState({
        name:"",
        category:"",
        description:"",
        rating: "",
        actualPrice:"",
        offerPrice:"",
        isBestSeller: false,
        availability: true,
        images:[],
    })
    const [Images, setImages] = useState([null, null, null, null])

    // For calling AddProduct function once all the product detials have been updated
    useEffect(()=>{
        const e = formRef.current
        if(productCreate){
            if(productDetails.images.length===4){
                AddProduct(e)
            }
        }
    },[productDetails, productCreate])


    const renderImage = (i) => {
        // console.log('Logic: ',i,' : ',(Images[i]!==null))
        // console.log((Images[i]!==null)?PhotoUploaded:PhotoUpload)
        return ((Images[i]!==null)?PhotoUploaded:PhotoUpload)
    }


    const handleImageUpdate = (e, i) =>{
        const tempImages = Images
        Images[i] = e.target.files[0]

        setImages(tempImages)
    }

    const AddProduct = async (e) => {
        setLoaderMsg('Final step in creation...')
        const form = e
        if(form){
            if(form.checkValidity()){
            if(isAdmin!==null && isAdmin === true){
                if(productDetails.name!==''&&productDetails.category!==''&&productDetails.description!==''&&productDetails.rating!==''&&productDetails.actualPrice!==''&&productDetails.offerPrice!==''){
                    const checkImages = Images.some(e=>{return e===null})
                    if(checkImages){
                        alert('Missing some Images, Please upload all 4 images!')
                    }else{
                        setLoader(true)
                        if(productDetails.images.length===4){
                            try{
                                let product = productDetails;
                                fetch('https://skecommerce-backend.onrender.com/addproduct', {
                                    method: 'POST',
                                    headers: {
                                    Accept:'application/json',
                                    'Content-Type':'application/json',
                                    "auth-token": `${localStorage.getItem('auth-token')}`
                                    },
                                    body: JSON.stringify(product),
                                })
                                .then((resp) => resp.json())
                                .then((data) => {
                                    setLoader(false)
                                    if(data.success){
                                        setLoaderMsg('Product created Successfully...')
                                        alert("Product Added Successfully!");
                                        window.location.href='/admin/products';
                                    }else{
                                        alert(data.message)
                                    }
                                }).catch((error)=>{
                                    setLoader(false)
                                    alert("Error connecting to Server! Please try again later.")
                                    console.log("Error connecting to Server",error)
                                })
                            }catch(error){
                                setLoader(false)
                                alert('Error Occurred while Adding Product! Contact Developer');
                                console.log(error)
                            }
                        }
                        else{
                            setLoader(false)
                            alert('Please upload all 4 Images!!')
                        }
                    }
                }else{
                    setLoader(false)
                    alert('Please fill the required fields')
                }
            }else{
                setLoader(false)
                alert('Access Denied! You are not authorized to add products')
                window.location.href="/"
            }
            }else{
                setLoader(false)
                form.classList.add("was-validated")
            }
        }else{
            setLoader(false)
            alert("Invalid form, please contact developer.")
        }
    }

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
                const imageUrl = data.url

                setUploadSpinner(prev=>{
                    const newData = [...prev]
                    newData[i] = false
                    return newData
                })

                setProductDetails((prev) => {
                    const newImages = [...prev.images];
                    newImages[i] = imageUrl;
                    return { ...prev, images: newImages };
                })

                setLoaderMsg(`Uploaded Image ${i+1}...`)
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


    const handleProductUpdation = () => {
        setUpdationLoader(true)
        const checkImages = Images.some(e=>{return e===null})
        if(checkImages){
            alert("You haven't uploaded all 4 Images!")
            setUpdationLoader(false)
        }
        else{
            if(productDetails.name!==''&&productDetails.category!==''&&productDetails.description!==''&&productDetails.rating!==''&&productDetails.actualPrice!==''&&productDetails.offerPrice!==''&&Images.length===4){
                setLoaderMsg('Preparing Images for uploading...')
                const promises = Images.map((img, i)=>{
                    return new Promise((resolve, reject)=>{
                        if(img!==null){
                            uploadImage(img, i, resolve, reject)
                        }else{
                            reject('Please upload all 4 Images!')
                            alert('Please upload all 4 Images!')
                        }
                    })
                })
            
                Promise.all(promises).then(()=>{
                    setLoaderMsg('Uploaded all Images...')
                    setLoader(true)
                    setProductCreate(true)
                }).catch((err)=>{
                    console.log('Error occured in promise: ',err)
                })
            }
            else{
                alert('Please fill in all details!')
            }
        }

    }




  return (
    <div>
        <AdminHeader/>
        <div className='container-fluid'>
            <div className='row'>
            <div className='col-md-12'>
                    <div className='w-100 d-flex flex-wrap justify-content-between align-items-center'>
                        <button onClick={()=>{window.location.href='/admin/dashboard'}} className='btn btn-outline-dark rounded-pill my-2'><i className="bi bi-arrow-left-circle"></i><span className='back-home-sm'> Dashboard</span><span className='back-home-lg'> Goto Dashboard</span></button>
                        <button type='button' className='btn btn-dark rounded-pill my-2' onClick={()=>{handleProductUpdation()}}>Create <i className="bi bi-folder-plus"></i></button>
                    </div>
                    <h4 className='text-center my-1'>Create Product</h4><hr/>
                    <div className='user-account-form-container'>
                    <form className='w-100' ref={formRef}>
                            <div className='checkout-form-left'>
                                <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                    <div className="my-2" style={{width: '320px'}}>
                                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                                        <input name='name' required value={productDetails.name} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.value})} type="text" className="form-control" id="ProductName" placeholder="Product's Name" />
                                    </div>
                                    <div className="my-2" style={{width: '320px'}}>
                                        <label htmlFor="ProductCategory" className="form-label">Product's Category</label>
                                        <select name='category' required value={productDetails.category} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.value})} id='ProductCategory' className="form-select" aria-label="Default select example">
                                            <option defaultValue={`Select Category`} disabled></option>
                                            <option value="fashion">Fashion</option>
                                            <option value="homeapplainces">Home Applainces</option>
                                        </select>
                                    </div>


                                    <div className="my-2"  style={{width: '320px'}}>
                                        <label className="form-label" htmlFor="ProductDescription">Product Description</label>
                                        <textarea name='description' required value={productDetails.description} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.value})} className="form-control" placeholder="Enter the Products Description here" id="ProductDescription"></textarea>
                                    </div>
                                    <div className='d-flex flex-wrap justify-content-evenly align-items-center w-100'>
                                        <div className="my-2" style={{width: '320px'}}>
                                            <label htmlFor="ProductRating" className="form-label">Product Rating</label>
                                            <input name='rating' required value={productDetails.rating} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.value})} type="number" min='1' max='5' className="form-control" id="ProductRating" placeholder="4.5" />
                                        </div>
                                        <div className="my-2" style={{width: '320px'}}>
                                            <label htmlFor="ProductActualPrice" className="form-label"><i className="bi bi-currency-rupee"></i> Actual Price</label>
                                            <input name='actualPrice' required  value={productDetails.actualPrice} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.value})} type="number" className="form-control" id="ProductActualPrice" placeholder="150" />
                                        </div>
                                        <div className="my-2" style={{width: '320px'}}>
                                            <label htmlFor="ProductOfferPrice" className="form-label"><i className="bi bi-currency-rupee"></i> Offer Price</label>
                                            <input name='offerPrice' required value={productDetails.offerPrice} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.value})} type="number" className="form-control" id="ProductOfferPrice" placeholder="99" />
                                        </div>
                                        <div className='d-flex justify-content-evenly align-items-center w-100 my-3'>
                                            <div className="form-check my-2">
                                                <label className="form-check-label" htmlFor="ProductBestSeller">Best Seller</label>
                                                <input name='isBestSeller' checked={productDetails.isBestSeller} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.checked})} type="checkbox" className="form-check-input" id="ProductBestSeller" />
                                            </div>
                                            <div className="form-check my-2">
                                                <label className="form-check-label" htmlFor="ProductAvailability">Availability</label>
                                                <input name='availability' checked={productDetails.availability} onChange={(e)=>setProductDetails({...productDetails,[e.target.name]:e.target.checked})} type="checkbox" className="form-check-input" id="ProductAvailability"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ProductImages" className="form-label text-center w-100 m-0 mt-2 fw-bold">Product Images</label>
                                    <div id='ProductImages' className='d-flex flex-wrap justify-content-evenly align-items-center'>
                                        <div>
                                            <label htmlFor='ProductImage1' className='form-label d-flex flex-column'>
                                                <div className='position-relative'>
                                                    <img src={(Images[0]!==null)?PhotoUploaded:PhotoUpload} alt='upload' className='img-label'/>
                                                    {uploadSpinner[0]&&<div className='position-absolute top-50 start-50 translate-middle'>
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>}
                                                </div>
                                                <p className='lead text-center'>Img1</p>
                                            </label>
                                            <input className="form-control" onChange={(e)=>{handleImageUpdate(e, 0)}} name='images' required type='file' hidden accept='image/*' id='ProductImage1'/>
                                            <div className="invalid-feedback fw-bold">
                                                * Please upload Image 1
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='ProductImage2' className='form-label d-flex flex-column'>
                                                <div className='position-relative'>
                                                    <img src={renderImage(1)} alt='upload' className='img-label'/>
                                                    {uploadSpinner[1]&&<div className='position-absolute top-50 start-50 translate-middle'>
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>}
                                                </div>
                                                <p className='lead text-center'>Img2</p>
                                            </label>
                                            <input className="form-control" onChange={(e)=>{handleImageUpdate(e, 1)}} name='images' required type='file' hidden accept='image/*' id='ProductImage2'/>
                                            <div className="invalid-feedback fw-bold">
                                                * Please upload Image 2
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='ProductImage3' className='form-label d-flex flex-column'>
                                                <div className='position-relative'>
                                                    <img src={renderImage(2)} alt='upload' className='img-label'/>
                                                    {uploadSpinner[2]&&<div className='position-absolute top-50 start-50 translate-middle'>
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>}
                                                </div>
                                                <p className='lead text-center'>Img3</p>
                                            </label>
                                            <input className="form-control" onChange={(e)=>{handleImageUpdate(e, 2)}} name='images' required type='file' hidden accept='image/*' id='ProductImage3'/>
                                            <div className="invalid-feedback fw-bold">
                                                * Please upload Image 3
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor='ProductImage4' className='form-label d-flex flex-column'>
                                                <div className='position-relative'>
                                                    <img src={renderImage(3)} alt='upload' className='img-label'/>
                                                    {uploadSpinner[3]&&<div className='position-absolute top-50 start-50 translate-middle'>
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>}
                                                </div>
                                                <p className='lead text-center'>Img4</p>
                                            </label>
                                            <input className="form-control" onChange={(e)=>{handleImageUpdate(e, 3)}} name='images' required type='file' hidden accept='image/*' id='ProductImage4'/>
                                            <div className="invalid-feedback fw-bold">
                                                * Please upload Image 4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='checkout-form-right'>
                                <div className='d-flex flex-wrap justify-content-center'>
                                    <button type='button' className='btn btn-dark m-2' onClick={()=>{handleProductUpdation()}}>Create <i className="bi bi-folder-plus"></i></button>
                                </div>
                            </div>      
                        </form>
                    </div>
                </div>
            </div>
        </div>
        { Loader && <SlowLoader/> }

        {updationLoader && <div className='text-center position-absolute top-50 start-50 translate-middle px-5 py-5 mx-2' style={{background: 'rgba(0, 0, 0, 0.6)'}}>
            <div>
                <div className="spinner-border text-light fs-4" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className='display-5 fs-4 m-0 text-light my-2'>Please wait, Product Creation in progress</p>
            </div>
            <p className="text-light fs-5 m-0">{loaderMsg}</p>
        </div>}

    </div>
  )
}

export default CreateProduct