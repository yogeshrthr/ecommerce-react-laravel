import React, { useEffect,  useState} from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../Sidebar'
import Loader from '../../common/Loader'
import { Link, useNavigate } from 'react-router-dom'
import NoState from '../../common/NoState'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'




const create = () => {   
    const navigate =useNavigate ();
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit =  async (data) => {
        // console.log(data)
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
                navigate('/admin/product')

            }else{
                toast.error(result.message)
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
                                                <select  className="form-control" name="" id="">
                                                    <option value="">Select Category</option>    
                                                    
                                                    {category && category.map(item => (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    ))}
                                                                                             
                                                </select>
                                            </div> 
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label   className="form-label" htmlFor="">Brand</label>
                                                <select  className="form-control" name="" id="">
                                                    <option value="">Select Brand</option> 
                                                        {brand && brand.map(item => (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    ))}                                               
                                                </select>
                                            </div> 
                                        </div>
                                     </div>

                                    <div className='mb-3'>
                                        <label htmlFor="">Status</label>
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
