import React, { useEffect,  useState, useRef, useMemo } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../Sidebar'
import Loader from '../../common/Loader'
import { Link, useNavigate } from 'react-router-dom'
import NoState from '../../common/NoState'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import JoditEditor from 'jodit-react';
import { Controller } from "react-hook-form";
import { toast } from 'react-toastify'





const create = ({placeholder}) => {   

    const editor = useRef(null);
	const [content, setContent] = useState('');
    const navigate =useNavigate ();
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);


 
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control, // <--- Add this here
    } = useForm();
    
    const onSubmit =  async (data) => {
      
        console.log(data)

        // return false
        const res= await fetch(`${apiUrl}/admin/product`,{
            method:'POST',
           headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body:JSON.stringify(data)

        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            if(result.status==200){
                toast.success(result.message)
                // navigate('/admin/product')
            }else{
                // toast.error(result.message)
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
            // console.log(result)
            if(result.status==200){
                setCategory(result.category);
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
            // console.log(result)
            if(result.status==200){
                setBrand(result.brand);
                // toast.success(result.message)
            }else{
                // toast.error(result.message)
            }
        })
    }
    useEffect(()=>{
        fetchCategories();
        console.log(category)
        fetchBrands();
        console.log(brand)
    },[]);

    return (
        <Layout>

            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Product / Create</h4>
                        <Link to="/admin/product"> <button className='btn btn-primary'>Back</button></Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
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


                                                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			                                        // onChange={newContent => {}}
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
                                    <div className='row mb-3'>
                                        <label  className='form-label' htmlFor="">File</label>
                                            <input type="file" id="gallery" className='form-control'
                                            
                                            { ...register("gallery",                                             
                                                {
                                                    // required:"File  is Required.!",
                                                    validate: {
                                                        lessThan1MB: files =>{
                                                            if (!files || files.length === 0) return true;
                                                            return files[0].size < 1000000 || 'Max size is 1MB';
                                                            // files[0]?.size < 1000000 || 'Max size is 1MB';
                                                        },
                                                            
                                                        acceptedFormats: files => {
                                                            if (!files || files.length === 0) return true;
                                                            return ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type) || 
                                                            'Only JPG, PNG, and GIF are allowed'
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
                                  
                                                                    

                                    <div className='mb-3'>
                                        
                                        
                                        <input className='btn btn-primary mt-3' type="submit" />
                                    </div>
                                
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default create
