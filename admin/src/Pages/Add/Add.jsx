import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add() {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8001/admin/addfoodlist', formData);
            if (response.data.success) {
                alert("Food item added successfully!");
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad'
                });
                setImage(null);
            }
            setData({
                name: '',
                description: '',
                price: '',
                category: 'Salad'
            })
            toast.success(response.data.message)
            setImage(null);
        } catch (error) {
            console.error("There was an error uploading the form data!", error);
        }
    };

    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className='flex-col'>
                <div className='add-image-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=''
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type='file'
                        id='image'
                        hidden
                        required
                    />
                </div>

                <div className='add-product-name'>
                    <p>Product Name</p>
                    <input
                        type='text'
                        onChange={onChangeHandler}
                        value={data.name}
                        name='name'
                        placeholder='Type Here'
                        required
                    />
                </div>

                <div className='add-product-description'>
                    <p>Product Description</p>
                    <textarea
                        name='description'
                        onChange={onChangeHandler}
                        value={data.description}
                        rows='6'
                        placeholder='Write content here'
                        required
                    ></textarea>
                </div>

                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name='category'
                        >
                            <option value='Salad'>Salad</option>
                            <option value='Rolls'>Rolls</option>
                            <option value='Deserts'>Deserts</option>
                            <option value='Sandwich'>Sandwich</option>
                            <option value='Cake'>Cake</option>
                            <option value='Pure Veg'>Pure Veg</option>
                            <option value='Pasta'>Pasta</option>
                            <option value='Noodels'>Noodels</option>
                        </select>
                    </div>

                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input
                            type='number'
                            onChange={onChangeHandler}
                            value={data.price}
                            name='price'
                            placeholder='$20'
                            required
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>
                    Add
                </button>
            </form>
        </div>
    );
}

export default Add;
