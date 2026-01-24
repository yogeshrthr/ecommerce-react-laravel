import React, { useEffect, useState  ,useRef,useMemo} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useForm } from 'react-hook-form'
import Layout from '../../common/Layout'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import Loader from '../../common/Loader'
import JoditEditor from 'jodit-react';
import { Controller } from "react-hook-form";



const edit = ({placeholder}) => {
 
    const galleryIdsRef = useRef([]);
    const galleryOldDeletedIdsRef = useRef([]);
    const galleryImagesurls = useRef([]);
    const galleryOldImagesurls = useRef([]);
    const editor = useRef(null);

    const productId = useParams().id;
    const [brand, setBrand] = useState([]);
    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);
    const [gallery, setGallery] = useState('');
    const [galleryOldDeleted, setOldgalleryDeleted] = useState('');
    const [galleryImages, setGalleryImages] = useState('');
    const [galleryOldImages, setGalleryOldImages] = useState('');
    const [category, setCategory] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [sizesChecked, setSizesChecked] = useState([]);
    const [product, setProduct] = useState([]);
  
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        setValue,
        getValues,
        control, // <--- Add this here
        formState: { errors }
    } = useForm({
        defaultValues: {
            defaultImage: ""
        }
    });
    const config = useMemo(() => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || 'Start typings...'
        }),
        [placeholder]
    );
    // fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            setLoader(true);
            const res = await fetch(`${apiUrl}/admin/product/${productId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                },

            });
            const result = await res.json();
            setLoader(false)
            if (result.status == 200) {

                setProduct(result.data)
                reset({
                    title: result.data.title || '',
                    brand_id: result.data.brand_id || '',
                    category_id: result.data.category_id || '',
                    description: result.data.description || '',
                    isFeatured: result.data.is_featured === 'yes' ? 'Yes' : 'No',
                    price: result.data.price || '',
                    qty: result.data.qty || '',
                    sku: result.data.sku || '',
                    status: result.data.status || '',
                    compare_price: result.data.compare_price || '',
                    short_description: result.data.short_description || '',
                    barcode: result.data.barcode || '',                   
                    defaultImage: result.data.default_image ? result.data.default_image .toString() : ''                  
                })
               
                // const ids = result.data.product_images.map(item => item.id);
                const images = result.data.product_images.map(item => ({
                        path: item.image_path,
                        id: item.id
                    }));

                galleryOldImagesurls.current = images; 
                setGalleryOldImages(images);
                const sizes=result.data.product_size.map(item => 
                       item.size_id
                    );
                // set sizes
                setSizesChecked(sizes);
                console.log(sizes)
            } else {
                toast.error(result.message)
            }
        }
        fetchProduct();
        fetchCategories();
        fetchBrands();
        fetchSizes();
    }, [productId, reset]);

    //on change fiel envent handle
    const HandleFileEvent = async(e)=>{
        const file = e.target.files[0];
        if (!file) return;
        setDisable(true)
        const formdata = new FormData();
        formdata.append('image',file)        

        const res=await fetch(`${apiUrl}/admin/save-temp-image`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Authorization':`Bearer ${adminToken()}`
            },
            body:formdata
        }).then(res=>res.json())
        .then(result=>{
            setDisable(false)
            galleryIdsRef.current.push(result.data.id)
            setGallery([...galleryIdsRef.current])
            galleryImagesurls.current.push({
                path: result.data.image_url,
                id: result.data.name
            });                        
                // result.data.image_url)
            setGalleryImages([...galleryImagesurls.current])
            
        })

    }


    const onSubmit = async (data) => {
        setDisable(true)
         const formData=new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if(key!='gallery' )
            formData.append(key, value); 
        }); 
              
        formData.append('galleryOldDeleted',galleryOldDeleted)
        formData.append('gallery',gallery)
        const res = await fetch(`${apiUrl}/admin/update-product/${productId}`, {
            method: 'POST',
            headers: {
                // 'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: formData

        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/product')
                } else {
                    setDisable(false)
                    toast.error(result.message)
                    if (result.error) {
                        Object.values(result.error).forEach(errors => {
                            errors.forEach(msg => {
                                toast.error(msg);
                            });
                        });
                    }
                }
            })

    }



    // new method to fetch categories
    const fetchCategories= async()=>{
        const res= await fetch(`${apiUrl}/admin/category`,{
            method:'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
        }).then(res=>res.json())
        .then(result=>{
            if(result.status==200){
                setCategory(result.category);
                // toast.success(result.message)
            }else{
                // toast.error(result.message)
            }
        })

    }
    // new method to fetch Sizes
    const fetchSizes= async()=>{
        const res= await fetch(`${apiUrl}/admin/sizes`,{
            method:'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
        }).then(res=>res.json())
        .then(result=>{
            if(result.status==200){
                setSizes(result.data);
              
                // toast.success(result.message)
            }else{
                // toast.error(result.message)
            }
        })

    }
    // new method to fetch categories
    const fetchBrands= async()=>{
        const res= await fetch(`${apiUrl}/admin/brand`,{
            method:'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
        }).then(res=>res.json())
        .then(result=>{
            if(result.status==200){
                setBrand(result.brand);
                // toast.success(result.message)
            }else{
                // toast.error(result.message)
            }
        })
    }
    // remove temperaroy image 
    const handleRemoveImage = (indexToRemove) => {

         // IMPORTANT: Also remove the ID from your galleryIdsRef so it's not sent to the server
        galleryImagesurls.current = galleryImagesurls.current.filter((_, index) => index !== indexToRemove); 
        setGalleryImages(prev => prev.filter((_, index) => index !== indexToRemove));
        
        // IMPORTANT: Also remove the ID from your galleryIdsRef so it's not sent to the server
        galleryIdsRef.current = galleryIdsRef.current.filter((_, index) => index !== indexToRemove);            
        // And update the state you use for the final form submit
        setGallery([...galleryIdsRef.current]);

     
    };

    // remove temperaroy image 
    const removeOldImage = (idToRemove,indexToRemove) => {

        // IMPORTANT: Also remove the ID from your galleryIdsRef so it's not sent to the server 
        galleryOldImagesurls.current = galleryOldImagesurls.current.filter((_, index) => index !== indexToRemove);           
        setGalleryOldImages(prev => prev.filter((_, index) => index !== indexToRemove));        
        galleryOldDeletedIdsRef.current.push(idToRemove.id)
        setOldgalleryDeleted([...galleryOldDeletedIdsRef.current])
         
        
       


    };


    return (
        <Layout>
            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Brand / Edit</h4>
                        <Link to="/admin/product"> <button className='btn btn-primary'>Back</button></Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        
                        {
                            loader ? <Loader /> : 
                            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                                <div className='card shadow' >
                                    <div className='card-body  p-4'>
                                        <div className='mb-3'> 
                                            <label htmlFor="">Title</label>
                                            <input id="title" className=' form-control'
                                                {...register("title",
                                                    {
                                                        required: "Title is required.",
                                                        maxLength: {
                                                            value: 20,
                                                            message: "title can't be exceed 20 charecters."
                                                        },
                                                        pattern: {
                                                            value: /^[A-Za-z 0-9 -]+$/i,
                                                            message: "title can be AlphaNumeric only."
                                                        }

                                                    }
                                                )} />
                                            {errors.title && (<p style={{ color: 'red' }}>**{errors.title.message}**</p>     )}
                                        </div>

                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className=' mb-3'>
                                                    <label className="form-label" htmlFor="">Category</label>
                                                    <select  className="form-control" name="category" id="category_id"
                                                        {...register("category_id",
                                                            {
                                                                required: "category is required.",
                                                            }
                                                        )} 
                                            
                                                    >
                                                        
                                                        <option value="">Select Category</option>                                        
                                                        
                                                        {category && category.map(item => (
                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                        ))}
                                                                                                
                                                    </select>
                                                    {errors.category_id && (
                                                        <span style={{ color: "red" }}>**{errors.category_id.message}**</span>
                                                    )}
                                                </div> 
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label   className="form-label" htmlFor="">Brand</label>
                                                    <select  className="form-control" name="" id="brand_id"
                                                        {...register("brand_id",
                                                            {
                                                                required: "Brand is required.",
                                                            }
                                                        )} 
                                                    >
                                                        <option value="">Select Brand</option> 
                                                            {brand && brand.map(item => (
                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                        ))}                                               
                                                    </select>    
                                                    {errors.brand_id && (
                                                        <span style={{ color: "red" }}>**{errors.brand_id.message}**</span>
                                                    )}                                           
                                                    
                                                </div> 
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='mb-3'>
                                                <label   className="form-label" htmlFor="">Short Description</label>
                                                <textarea name="" id="short_description" className='form-control'
                                                { ...register("short_description",
                                                    {
                                                        // required:"Short Desc is Required.!",
                                                        maxLength:{
                                                                value: 60,
                                                                message: "Short Descritpion can't be exceed 60 charecters."
                                                        },                                               

                                                    })

                                                }
                                                ></textarea>
                                                    {errors.short_description && (
                                                        <span style={{ color: "red" }}>**{errors.short_description.message}**</span>
                                                    )}  
                                            </div> 
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='mb-3'>
                                                <label   className="form-label" htmlFor="">Description</label>
                                            <Controller
                                                    name="description"
                                                    control={control} // 'control' comes from useForm()
                                                    rules={{ 
                                                        required: "Description is Required!",
                                                        minLength: { value: 20, message: "Description is too short" } 
                                                    }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <JoditEditor
                                                        ref={editor}
                                                        value={value} // Use 'value' from Controller
                                                        config={{readonly: false,
                                                            // This ensures it stays as HTML
                                                            uploader: { insertImageAsBase64URI: true },}}
                                                        onBlur={(newContent) => onChange(newContent)} // Updates the form state


                                                    
                                                        />
                                                    )}
                                                />

                                                {errors.description && (
                                                    <span style={{ color: "red" }}>**{errors.description.message}**</span>
                                                )}  
                                            </div> 
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-md-6'>
                                                <label   className="form-label" htmlFor="">Price</label>
                                                <input id="price" type="text" className='form-control' placeholder='Price'
                                                { ...register("price",                                             
                                                    {
                                                        required:"price is Required.!",
                                                        min: {
                                                            value: 1,
                                                            message: "Price must be at least 1"
                                                        },
                                                        pattern: {
                                                            value: /^[0-9]+$/, // This regex only allows whole numbers
                                                            message: "Please enter digits only (integers)"
                                                        },                                                                                                                             

                                                    })

                                                }
                                                />
                                                {errors.price && (
                                                    <span style={{ color: "red" }}>**{errors.price.message}**</span>
                                                )}  
                                            </div>   
                                            <div className='col-md-6'>
                                                <label   className="form-label" htmlFor="">Discounted Price</label>
                                                <input type="text"  id="compare_price" className='form-control' placeholder='Discounted Price' 
                                                    { ...register("compare_price",                                             
                                                        {
                                                            // required:"Compared price is Required.!",
                                                            //                                                 pattern: {
                                                            // value: /^[0-9]+$/, // This regex only allows whole numbers
                                                            // message: "Please enter digits only (integers)"
                                                        // },                                                                                                                             

                                                    })

                                                }
                                                />
                                                {errors.discount_price && (
                                                    <span style={{ color: "red" }}>**{errors.discount_price.message}**</span>
                                                )}  
                                            </div>                                        
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-md-6'>
                                                <label   className="form-label" htmlFor="">SKU</label>
                                                <input type="text" id="sku" className='form-control' placeholder='Sku' 

                                                { ...register("sku", {
                                                        required:"sku is Required.!",
                                                    }                                   
                                                        
                                                )}
                                

                                                />
                                                {errors.sku && (
                                                    <span style={{ color: "red" }}>**{errors.sku.message}**</span>
                                                )} 
                                            </div>   
                                            <div className='col-md-6'>
                                                <label   className="form-label" htmlFor="">Barcode</label>
                                                <input type="text" id="barcode" className='form-control' placeholder='Barcode'
                                                    { ...register("barcode",                                             
                                                        {
                                                            required:"Barcode  is Required.!",                                                                                                                                                                                  

                                                        })
                                                    }
                                                    
                                                />


                                                {errors.barcode && (
                                                    <span style={{ color: "red" }}>**{errors.barcode.message}**</span>
                                                )} 
                                            </div>                                        
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-md-6'>
                                                <label   className="form-label" htmlFor="">QTY</label>
                                                <input type="text" id="qty" className='form-control' placeholder='Qty'
                                                { ...register("qty",                                             
                                                    {
                                                        required:"Quantity is Required.!",
                                                        pattern: {
                                                            value: /^[0-9]+$/, // This regex only allows whole numbers
                                                            message: "Please enter digits only (integers)"
                                                        },                                                                                                                             

                                                    })
                                                }
                                                />
                                                {errors.qty && (
                                                    <span style={{ color: "red" }}>**{errors.qty.message}**</span>
                                                )} 
                                            </div> 
                                            <div className='col-md-6 '>
                                                <label  className='form-label' htmlFor="">Status</label>
                                                    <select id="status" className=' form-control'
                                                        {...register("status",
                                                            {
                                                                required: "Status Should be selected",
                                                            }
                                                        )} >
                                                        <option value="">Select</option>
                                                        <option value="1">Active</option>
                                                        <option value="0">InActive</option>
                                                    </select>
                                                {errors.status && (<p style={{ color: 'red' }}>**{errors.status.message}**</p>     )}
                                            </div>  
                                                                                    
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="">Size</label>
                                            <div className="d-flex align-items-center flex-wrap gap-3">
                                                {sizes && sizes.map((item) => (
                                                <div className="form-check form-check-inline" key={item.id}>
                                                    <input
                                                    {...register('size',
                                                        {
                                                            required:"Porduct size is required"
                                                        }

                                                    )}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`size-${item.id}`}
                                                    checked={sizesChecked.includes(item.id)}
                                                    onChange={(e)=>{
                                                        if(e.target.checked){
                                                            setSizesChecked([...sizesChecked,item.id])
                                                        }else{
                                                            setSizesChecked(sizesChecked.filter(sid=> item.id!=sid))
                                                        }
                                                    }
                                                        
                                                    }
                                                    />
                                                    <label
                                                    className="form-check-label"
                                                    htmlFor={`size-${item.id}`}
                                                    >
                                                    {item.name}
                                                    </label>
                                                </div>
                                                ))}
                                            </div>
                                             {errors.size && (<p style={{ color: 'red' }}>**{errors.size.message}**</p>     )}
                                        </div>

                                        <div className='row mb-3'>
                                            <label  className='form-label' htmlFor="">File</label>
                                                <input  type="file" id="" className='form-control'
                                                
                                                { ...register("gallery",                                             
                                                    {
                                                        // onChange: (e) => { HandleFileEvent(e) },
                                                        // required:"File  is Required.!",
                                                        validate: {
                                                            lessThan1MB: files =>{
                                                                if (!files || files.length === 0) return true;
                                                                return files[0].size < 10000000 || 'Max size is 10MB';
                                                                // files[0]?.size < 1000000 || 'Max size is 1MB';
                                                            },
                                                                
                                                            acceptedFormats: files => {
                                                                if (!files || files.length === 0) return true;
                                                                return ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type) || 
                                                                'Only JPG, PNG, and GIF are allowed'
                                                            }
                                                            
                                                        }  ,
                                                        // 2. The Logic: Validate only this field on change
                                                        onChange: async (e) => {
                                                            // Trigger validation for ONLY this field
                                                            const isFieldValid = await trigger("gallery");

                                                            if (isFieldValid) {
                                                                // Only runs if the file is < 1MB and correct format
                                                                HandleFileEvent(e); 
                                                            } else {
                                                                // Validation failed: HandleFileEvent is NOT called
                                                                console.log("File is invalid, stopping API call.");
                                                            }
                                                        }                                                                         

                                                    })
                                            }
                                                />
                                            {errors.gallery && (<p style={{ color: 'red' }}>**{errors.gallery.message}**</p>     )}
                                        </div> 
                                        <div className='row'>
                                            <div className='mb-3'>
                                                <label className='form-label d-block'>Is Featured?</label>
                                                
                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        {...register("isFeatured", { required: "Please select an option" })}
                                                        className={`form-check-input ${errors.isFeatured ? 'is-invalid' : ''}`} 
                                                        type="radio" 
                                                        value="Yes" 
                                                        id="featuredYes" 
                                                    />
                                                    <label className="form-check-label" htmlFor="featuredYes">Yes</label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        {...register("isFeatured", { required: "Please select an option" })}
                                                        className={`form-check-input ${errors.isFeatured ? 'is-invalid' : ''}`} 
                                                        type="radio" 
                                                        value="No" 
                                                        id="featuredNo" 
                                                    />
                                                    <label className="form-check-label" htmlFor="featuredNo">No</label>
                                                </div>

                                                {/* Error Message */}
                                                {errors.isFeatured && (
                                                    <p className="text-danger" style={{ fontSize: '14px' }}>
                                                        {errors.isFeatured.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>  
                                        <div className='mb-3 row'>
                                            {  
                                                galleryOldImages && galleryOldImages.map((item,index ) => (
                                                    
                                                        <div className='col-md-2' key={index}>
                                                            <div className='w-100-card-shadow content-align-center position-relative'> 
                                                                
                                                                    <button 
                                                                        type="button" 
                                                                        onClick={() => removeOldImage(item,index)} 
                                                                        className="delete-btn"
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                <img src={item.path} alt="" width={100} />
                                                            </div>
                                                            <div className="mt-2">
                                                                <label className="me-2">Set As Default</label>

                                                                <input
                                                                type="radio"
                                                                value={item.id}   // or index
                                                               
                                                                {...register("defaultImage", {
                                                                    required: "Please select a default image"
                                                                })}
                                                                className={`form-check-input ${
                                                                    errors.defaultImage ? "is-invalid" : ""
                                                                }`}
                                                                />
                                                            </div>
                                                        </div>  
                                                    
                                                ))
                                                
                                            }
                                            
                                            
                                            {  
                                                galleryImages && galleryImages.map((item,index ) => (
                                                    
                                                        <div className='col-md-2' key={index}>
                                                            <div className='card-shadow content-align-center position-relative'>
                                                                {/* The Close Button */}
                                                                    <button 
                                                                        type="button" 
                                                                        onClick={() => handleRemoveImage(index)} 
                                                                        className="delete-btn"
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                <img src={item.path} alt="" width={100} />
                                                            </div>
                                                            <div className="mt-2">
                                                                <label className="me-2">Set As Default</label>

                                                                <input
                                                                    type="radio"
                                                                    value={item.id}   // or index
                                                                    {...register("defaultImage", {
                                                                        required: "Please select a default image"
                                                                    })}
                                                                    className={`form-check-input ${
                                                                        errors.defaultImage ? "is-invalid" : ""
                                                                    }`}
                                                                />
                                                            </div>
                                                        </div>
                                                    
                                                ))
                                                
                                            }
                                            
                                            {errors.defaultImage && (
                                                    <p className="text-danger" style={{ fontSize: '14px' }}>
                                                        {errors.defaultImage.message}
                                                    </p>
                                                )}
                                        </div>      
                                        <div className='mb-3'>
                                            <input disabled={disable} className='btn btn-primary mt-3' type="submit" />
                                        </div>
                                    
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default edit
