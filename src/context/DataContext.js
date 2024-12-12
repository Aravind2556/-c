import React, {createContext, useState, useEffect} from "react";

export const DataContext = createContext(null)

const DataContextProvider = (props) => {

    const [Products,setProducts] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [isValidAuth, setIsValidAuth] = useState(false)
    const [Loader, setLoader] = useState(false)

    // Sample Products
    const SampleProducts = [
        {
        id: 1,
        name: 'T-Shirt',
        description: 'A trendy and comfortable T-shirt for a casual and stylish look.',
        bestSeller: false,
        rating: 3.2,
        price: 25.99,
        category: 'fashion',
        image: 'tshirt',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 2,
        name: 'Denim Jeans',
        description: 'High-quality denim jeans for a timeless and versatile wardrobe staple.',
        bestSeller: true,
        rating: 4.5,
        price: 49.99,
        category: 'fashion',
        image: 'jeans',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 3,
        name: 'Fashionable Sneakers',
        description: 'Step out in style with our fashionable sneakers. These trendy shoes combine comfort and elegance.',
        bestSeller: true,
        rating: 4.0,
        price: 59.99,
        category: 'fashion',
        image: 'sneakers',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 4,
        name: 'Modern Coffee Table',
        description: 'Add a touch of modernity to your living space with our sleek and functional coffee table.',
        bestSeller: false,
        rating: 4.8,
        price: 149.99,
        category: 'applainces',
        image: 'table',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 5,
        name: 'Elegant Sofa Set',
        description: 'Create a sophisticated living room with our elegant sofa set. Comfort meets style in this exquisite furniture piece.',
        bestSeller: true,
        rating: 4.7,
        price: 899.99,
        category: 'applainces',
        image: 'sofa',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 6,
        name: 'Summer Sunglasses',
        description: 'Stay stylish and protect your eyes with our Summer Sunglasses. The perfect accessory for sunny days.',
        bestSeller: false,
        rating: 4.4,
        price: 34.99,
        category: 'fashion',
        image: 'sunglass',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 7,
        name: 'Comfortable Bedding Set',
        description: 'Experience comfort like never before with our Comfortable Bedding Set. Perfect for a restful night\'s sleep.',
        bestSeller: true,
        rating: 4.6,
        price: 89.99,
        category: 'applainces',
        image: 'bedding',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 8,
        name: 'Wireless Earbuds',
        description: 'Enjoy a tangle-free audio experience with our Wireless Earbuds. High-quality sound and convenient wireless technology.',
        bestSeller: false,
        rating: 4.2,
        price: 59.99,
        category: 'applainces',
        image: 'earbuds',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 9,
        name: 'Casual Backpack',
        description: 'Carry your essentials in style with our Casual Backpack. Durable and trendy, it\'s perfect for daily adventures.',
        bestSeller: true,
        rating: 4.5,
        price: 49.99,
        category: 'fashion',
        image: 'backpack',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 10,
        name: 'Smart Home Thermostat',
        description: 'Upgrade your home with our Smart Home Thermostat. Efficient and easy-to-use for optimal comfort and energy savings.',
        bestSeller: false,
        rating: 4.3,
        price: 129.99,
        category: 'applainces',
        image: 'thermostat',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 11,
        name: 'Casual Canvas Shoes',
        description: 'Versatile and comfortable canvas shoes for your everyday casual style.',
        bestSeller: true,
        rating: 4.3,
        price: 29.99,
        category: 'fashion',
        image: 'shoes',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 12,
        name: 'Modern Dining Table Set',
        description: 'Upgrade your dining area with our modern dining table set. Elegant design meets functionality.',
        bestSeller: false,
        rating: 4.6,
        price: 499.99,
        category: 'applainces',
        image: 'dining',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 13,
        name: 'Leather Office Chair',
        description: 'Enhance your office space with a comfortable and stylish leather office chair.',
        bestSeller: true,
        rating: 4.9,
        price: 179.99,
        category: 'applainces',
        image: 'officechair',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 14,
        name: 'Classic Leather Belt',
        description: 'Complete your look with a classic leather belt. Timeless style for any occasion.',
        bestSeller: false,
        rating: 4.2,
        price: 24.99,
        category: 'fashion',
        image: 'belt',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 15,
        name: 'Contemporary Bookshelf',
        description: 'Organize your books and decor with a contemporary bookshelf. Functional and stylish.',
        bestSeller: true,
        rating: 4.7,
        price: 129.99,
        category: 'applainces',
        image: 'bookshelf',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 16,
        name: 'Smart Home Security Camera',
        description: 'Enhance your home security with our Smart Home Security Camera. Stay connected and monitor your home remotely with advanced features.',
        bestSeller: false,
        rating: 4.3,
        price: 129.99,
        category: 'applainces',
        image: 'securitycamera',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 17,
        name: 'Professional Chef\'s Knife',
        description: 'Slice and dice like a pro with our Professional Chef\'s Knife. Designed for precision and durability, it\'s an essential tool for any kitchen.',
        bestSeller: true,
        rating: 4.8,
        price: 79.99,
        category: 'applainces',
        image: 'knife',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 18,
        name: 'Minimalist Desk Lamp',
        description: 'Illuminate your workspace with our Minimalist Desk Lamp. Sleek and modern, it adds a touch of elegance while providing optimal lighting for your tasks.',
        bestSeller: false,
        rating: 4.4,
        price: 39.99,
        category: 'applainces',
        image: 'lamp',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 19,
        name: 'Ultra HD Smart TV',
        description: 'Experience entertainment like never before with our Ultra HD Smart TV. With stunning visuals and smart features, it\'s the centerpiece of your home theater.',
        bestSeller: true,
        rating: 4.7,
        price: 899.99,
        category: 'applainces',
        image: 'smarttv',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        },
        {
        id: 20,
        name: 'Minimalist Desk Lamp',
        description: 'Illuminate your workspace with our Minimalist Desk Lamp. Sleek and modern, it adds a touch of elegance while providing optimal lighting for your tasks.',
        bestSeller: false,
        rating: 4.4,
        price: 39.99,
        category: 'applainces',
        image: 'lamp',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1529720317453-c8da503f2051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjB0c2hpcnR8ZW58MHwwfDB8fHwy',
            'https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHNob2VzfGVufDB8MHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amVhbnN8ZW58MHwwfDB8fHwy'
        ]
        }
    ]

    const getDefaultCart = () => {
        let cart = {};
        for (let i = 0; i < 300; i++) {
          cart[i] = null;
        }
        return cart;
    }

    const [cartItems, setCartItems] = useState(getDefaultCart())

    useEffect(()=>{
        fetch('https://skecommerce-backend.onrender.com/allproducts') 
          .then((res) => res.json()) 
          .then((data) => {
            if(data.success){
                setProducts(data.products)
            }else{
                setProducts([])
                alert(data.message)
            }
        }).catch(err => console.log("Error in getting all products from server: ", err))

        if(localStorage.getItem("auth-token")){
            fetch('https://skecommerce-backend.onrender.com/getcart', {
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
                if(data.success){
                    setCartItems(data.cartData)
                }else{
                    alert(data.message)
                }
            }).catch((error)=>console.log('Error in getting the cart items from the Server:',error));

        
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
                setIsValidAuth(data.success)
                if(data.success){
                    setUserInfo(data.User)
                }else{
                    setUserInfo([])
                    alert(data.message)
                }
            })
            .catch((error) => {
                alert('Error connecting to the Server when fetching User info!, Please try again later.')
                console.error('Error fetching user info: ', error);
            })
        }else{
            setUserInfo([])
        }

    }, [])

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            totalItem += cartItems[item];
          }
        }
        return totalItem;
    }

    const addToCart = (itemId, redirect) => {
        setLoader(true)
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem("auth-token")){
          fetch('https://skecommerce-backend.onrender.com/addtocart', {
          method: 'POST',
          headers: {
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem("auth-token")}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({"itemId":itemId}),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setLoader(false)
            if(data.success){
                if(redirect){
                    window.location.href='/cart'
                }else{
                    alert('Product added to Cart Successfully!')
                }
            }else{
                if('redirect' in data && data.redirect === true){
                    alert('Please login to continue!')
                    window.location.href('/signin')
                }else{
                    alert(data.message)
                }
            }
          }).catch(err=>{
            setLoader(false)
            alert('Error in connecting to the Server on Add To Cart! Please try again later.')
            console.log("Error on Add to Cart: ",err)
          })
        }else{
            setLoader(false)
            alert('Please login to continue!')
            window.location.href='/signin'
        }
      }


      const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem("auth-token"))
        {
          fetch('https://skecommerce-backend.onrender.com/removefromcart', {
          method: 'POST',
          headers: {
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem("auth-token")}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({"itemId":itemId}),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if(!data.success){
                alert(data.message)
            }
          }).catch(err=>{
            alert('Error in removing the product from the Cart! Please try again later.')
            console.log('Error in Remove from Cart: ',err)
          })
        }
    }


    const UserAuth = (props)=> {
        if(props){
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
                    setIsValidAuth(data.success)
                    if(data.success){
                        setUserInfo(data.User)
                        window.location.href='/'
                    }else{
                        setUserInfo([])
                        alert(data.message)
                    }
                })
                .catch((error) => {
                    alert('Error on connecting to the Server! Please try again later.')
                    console.log('Error on User Info: ', error);
                });

            }else{
                setIsValidAuth(false)
                setUserInfo([])
                window.location.href='/signin'
            }
        }else{
            localStorage.removeItem('auth-token')
            setIsValidAuth(false)
            setUserInfo([])
            window.location.href='/'
        }
    
    }


    const contextValue = {SampleProducts, getTotalCartItems, setCartItems, cartItems, addToCart, removeFromCart, UserAuth, Products, userInfo, isValidAuth, Loader, setLoader}
    return(
        <DataContext.Provider value={contextValue}>
            {props.children}
        </DataContext.Provider>
    )
}
export default DataContextProvider