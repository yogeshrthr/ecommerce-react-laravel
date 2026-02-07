import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useForm } from 'react-hook-form'
import Layout from '../../common/Layout'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import Loader from '../../common/Loader'



const edit = () => {
    const categoryId = useParams().id;
    const [category, setCategory] = useState([]);
    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {

        const fetchCategory = async () => {

            setLoader(true);

            const res = await fetch(`${apiUrl}/admin/category/${categoryId}`, {
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
                setCategory(result.category)
                reset({
                    name: result.category.name || '',
                    status: result.category.status ,
                })
            } else {
                toast.error(result.message)
            }
        }
        fetchCategory();
    }, [categoryId, reset]);



    const onSubmit = async (data) => {
        setDisable(true)
        console.log(data)
        const res = await fetch(`${apiUrl}/admin/category/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)

        }).then(res => res.json())
            .then(result => {

               //  console.log(result)
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/category')
                } else {
                    setDisable(false)
                    toast.error(result.message)
                }
            })

    }







    return (
        <Layout>
            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Categories / Edit</h4>
                        <Link to="/admin/category"> <button className='btn btn-primary'>Back</button></Link>
                    </div>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='card shadow' >
                            <div className='card-body  p-4'>
                                {
                                    loader ? <Loader /> :

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
                                                            value: /^[A-Za-z 0-9 _'-]+$/i,
                                                            message: "Name can be AlphaNumeric only."
                                                        }

                                                    }


                                                )} />

                                            {errors.name && (<p style={{ color: 'red' }}>**{errors.name.message}**</p>)}
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

                                            {errors.status && (<p style={{ color: 'red' }}>**{errors.status.message}**</p>)}

                                            <input className={` ${disable ? 'disabled' : ''}  btn btn-primary mt-3`} type="submit" />
                                        </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default edit
