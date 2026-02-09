import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useForm } from 'react-hook-form'
import Layout from '../../common/Layout'
import { adminToken, apiUrl } from '../../common/http'
import { toast } from 'react-toastify'
import Loader from '../../common/Loader'



const edit = () => {
    const [shipping, setShipping] = useState([]);
    const [disable, setDisable] = useState(false);
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {

        
        fetchShipping();
    }, []);

    const fetchShipping = async () => {

        setLoader(true);

        const res = await fetch(`${apiUrl}/admin/get-shipping-charge`, {
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
            setShipping(result.data)
            reset({
                shipping_charge: result.data.shipping_charge || '',
                // status: result.category.status ,
            })
        } else {
            toast.error(result.message)
        }
    }




    const onSubmit = async (data) => {
        setDisable(true)
        const res = await fetch(`${apiUrl}/admin/update-shipping-charge`, {
            method: 'POST',
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
                } else {
                    setDisable(false)
                    toast.error(result.message)
                }
            })
            .finally(()=>{
                 setDisable(false)
            })

    }


    return (
        <Layout>
            <div className='container'>
                <div className='row py-5'>
                    <div className='d-flex justify-content-between mt-5 pb-3'>
                        <h4 className=' h4 pb-0 mb-0'> Shipping / Update</h4>
                        {/* <Link to="/admin/category"> <button className='btn btn-primary'>Back</button></Link> */}
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
                                            <label htmlFor="">Shipping Charge</label>
                                            <input id="name" className='mb-3 form-control'
                                                {...register("shipping_charge",
                                                    {
                                                        required: "Charges is required.",
                                                    }
                                                )} />

                                            {errors.name && (<p style={{ color: 'red' }}>**{errors.name.message}**</p>)}
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
