import React from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../Sidebar'
import Loader from '../../common/Loader'
import { Link, useNavigate } from 'react-router-dom'
import NoState from '../../common/NoState'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'



const create = () => {   
    const navigate =useNavigate ();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const onSubmit =  async (data) => {
        console.log(data)
        const res= await fetch(`${apiUrl}/admin/brand`,{
            method:'POST',
           headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body:JSON.stringify(data)

        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            if(result.status==200){
                toast.success(result.message)
                navigate('/admin/brand')

            }else{
                toast.error(result.message)
            }
        })



    }

    return (
        <Layout>

            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Brand / Create</h4>
                        <Link to="/admin/brand"> <button className='btn btn-primary'>Back</button></Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='card shadow' >
                            <div className='card-body  p-4'>
                                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                                    <label htmlFor="">Name</label>
                                    <input id="name" className='mb-3 form-control'
                                        {...register("name",
                                            {
                                                required: "Name is required.",
                                                maxLength: {
                                                    value: 20,
                                                    message: "Name can't be exceed 20 charecters."
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z 0-9 -]+$/i,
                                                    message: "Name can be AlphaNumeric only."
                                                }

                                            }


                                        )} />

                                    {errors.name && (<p style={{ color: 'red' }}>**{errors.name.message}**</p>     )}
                                    <label htmlFor="">Status</label>
                                    <select id="status" className='mb-3 form-control'
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
                                </form>




                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default create
