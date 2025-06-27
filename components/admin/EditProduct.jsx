// // components/admin/EditProduct.jsx
// "use client";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';
// import Head from 'next/head';
// import {
//     IconArrowLeft,
//     IconPlus,
//     IconTrash,
//     IconChevronLeft,
//     IconChevronRight,
//     IconX
// } from '@tabler/icons-react';
// import { Categories } from '@/public/Categories';
// import {FileUpload} from "../ui/file-upload"; // Adjust the import path as necessary
//
// const EditProduct = ({ isEdit = false, productId = null }) => {
//     const router = useRouter();
//     const params = useParams();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [product, setProduct] = useState({
//         name: '',
//         category: [],
//         tagline: '',
//         description: '',
//         price: '',
//         stock: '',
//         all_images: [],
//         sizes: [],
//         colors: [],
//     });
//
//
//     // Get product ID from params if editing
//     const currentProductId = productId || params?.id;
//     const isEditing = isEdit || !!currentProductId;
//
//     useEffect(() => {
//         if (isEditing && currentProductId) {
//             fetchProduct();
//         }
//     }, [isEditing, currentProductId]);
//
//     const fetchProduct = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await fetch(`/api/products/${currentProductId}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch product');
//             }
//             const data = await response.json();
//             const productData = data.data || data;
//             setProduct(productData);
//         } catch (error) {
//             console.error('Error fetching product:', error);
//             setError('Failed to fetch product data');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
//     };
//
//     const handleCategoryChange = (e) => {
//         const { value, checked } = e.target;
//         setProduct((prevProduct) => {
//             const newCategories = checked
//                 ? [...prevProduct.category, value]
//                 : prevProduct.category.filter((category) => category !== value);
//             return { ...prevProduct, category: newCategories };
//         });
//     };
//
//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             all_images: [...prevProduct.all_images, ...files],
//         }));
//     };
//
//     const handleDeleteImage = (index) => {
//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             all_images: prevProduct.all_images.filter((_, i) => i !== index),
//         }));
//     };
//
//     const swapImages = (index1, index2) => {
//         const newImages = [...product.all_images];
//         [newImages[index1], newImages[index2]] = [newImages[index2], newImages[index1]];
//         setProduct((prevProduct) => ({ ...prevProduct, all_images: newImages }));
//     };
//
//     const handleSizeChange = (index, field, value) => {
//         const newSizes = [...product.sizes];
//         newSizes[index][field] = value;
//         setProduct((prevProduct) => ({ ...prevProduct, sizes: newSizes }));
//     };
//
//     const handleColorChange = (index, field, value) => {
//         const newColors = [...product.colors];
//         newColors[index][field] = value;
//         setProduct((prevProduct) => ({ ...prevProduct, colors: newColors }));
//     };
//
//     const addSizeField = () => {
//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             sizes: [...prevProduct.sizes, { size: '', price: '' }],
//         }));
//     };
//
//     const addColorField = () => {
//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             colors: [...prevProduct.colors, { color: '', price: '' }],
//         }));
//     };
//
//     const deleteSizeField = (index) => {
//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             sizes: prevProduct.sizes.filter((_, i) => i !== index),
//         }));
//     };
//
//     const deleteColorField = (index) => {
//         setProduct((prevProduct) => ({
//             ...prevProduct,
//             colors: prevProduct.colors.filter((_, i) => i !== index),
//         }));
//     };
//
//     const isValidUrl = (string) => {
//         try {
//             new URL(string);
//             return true;
//         } catch (_) {
//             return false;
//         }
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//
//         const formData = new FormData();
//
//         // Append product data
//         formData.append('name', product.name);
//         formData.append('category', JSON.stringify(product.category));
//         formData.append('tagline', product.tagline);
//         formData.append('description', product.description);
//         formData.append('price', product.price);
//         formData.append('stock', product.stock);
//         formData.append('sizes', JSON.stringify(product.sizes));
//         formData.append('colors', JSON.stringify(product.colors));
//
//         if (isEditing) {
//             const existingImages = product.all_images
//                 .map((image, index) => isValidUrl(image) ? { image, index } : null)
//                 .filter(item => item !== null);
//             formData.append('existingImages', JSON.stringify(existingImages));
//         }
//
//         // Append new images only
//         product.all_images.forEach((image) => {
//             if (!isValidUrl(image)) {
//                 formData.append('all_images', image);
//             }
//         });
//
//         try {
//             const url = isEditing ? `/api/products/${currentProductId}` : '/api/products';
//             const method = isEditing ? 'PUT' : 'POST';
//
//             const response = await fetch(url, {
//                 method: method,
//                 body: formData,
//             });
//
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to save product');
//             }
//
//             // Navigate back to admin panel
//             router.push('/admin?tab=products');
//         } catch (error) {
//             console.error('Error saving product:', error);
//             setError(error.message || 'Failed to save product');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleCancel = () => {
//         router.push('/admin?tab=products');
//     };
//
//     if (loading && isEditing) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//                     <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <>
//             <Head>
//                 <title>{isEditing ? 'Edit Product' : 'Add New Product'} - Admin Panel</title>
//             </Head>
//
//             <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 py-8">
//                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                     {/* Header */}
//                     <div className="mb-8">
//                         <button
//                             onClick={handleCancel}
//                             className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
//                         >
//                             <IconArrowLeft size={20} className="mr-2" />
//                             Back to Products
//                         </button>
//
//                         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                             {isEditing ? 'Edit Product' : 'Add New Product'}
//                         </h1>
//                         <p className="text-gray-600 dark:text-gray-400 mt-2">
//                             {isEditing ? 'Update product information and settings' : 'Create a new product for your store'}
//                         </p>
//                     </div>
//
//                     {/* Error Message */}
//                     {error && (
//                         <div className="mb-6 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded">
//                             {error}
//                         </div>
//                     )}
//
//                     {/* Product Form */}
//                     <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 space-y-6">
//                         {/* Basic Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Product Name *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={product.name}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     required
//                                 />
//                             </div>
//
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Tagline *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="tagline"
//                                     value={product.tagline}
//                                     onChange={handleChange}
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     required
//                                 />
//                             </div>
//                         </div>
//
//                         {/* Description */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Description *
//                             </label>
//                             <textarea
//                                 name="description"
//                                 value={product.description}
//                                 onChange={handleChange}
//                                 rows={4}
//                                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 required
//                             />
//                         </div>
//
//                         {/* Price and Stock */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Price (₹) *
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     value={product.price}
//                                     onChange={handleChange}
//                                     min="0"
//                                     step="0.01"
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     required
//                                 />
//                             </div>
//
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                     Stock Quantity *
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="stock"
//                                     value={product.stock}
//                                     onChange={handleChange}
//                                     min="0"
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     required
//                                 />
//                             </div>
//                         </div>
//
//                         {/* Categories */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                                 Categories
//                             </label>
//                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-neutral-700">
//                                 {Categories.map((category) => (
//                                     <label key={category.name} className="flex items-center space-x-2 cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             value={category.name}
//                                             checked={product.category.includes(category.name)}
//                                             onChange={handleCategoryChange}
//                                             className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                                         />
//                                         <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Images */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                                 Product Images
//                             </label>
//
//                             <div className="mb-4">
//                                 <input
//                                     type="file"
//                                     multiple
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
//                                 />
//                                 <FileUpload onChange={handleImageChange} />
//                                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                                     Select multiple images. The first image will be the main product image.
//                                 </p>
//                             </div>
//
//                             {product.all_images.length > 0 && (
//                                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                                     {product.all_images.map((image, index) => (
//                                         <div key={index} className="relative group">
//                                             <img
//                                                 src={isValidUrl(image) ? image : URL.createObjectURL(image)}
//                                                 alt={`Product ${index + 1}`}
//                                                 className="w-full h-32 object-cover rounded-md border border-gray-200 dark:border-gray-600"
//                                             />
//
//                                             {/* Image controls */}
//                                             <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center space-x-2">
//                                                 {index > 0 && (
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => swapImages(index, index - 1)}
//                                                         className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
//                                                         title="Move left"
//                                                     >
//                                                         <IconChevronLeft size={16} />
//                                                     </button>
//                                                 )}
//
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleDeleteImage(index)}
//                                                     className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
//                                                     title="Delete"
//                                                 >
//                                                     <IconX size={16} />
//                                                 </button>
//
//                                                 {index < product.all_images.length - 1 && (
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => swapImages(index, index + 1)}
//                                                         className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
//                                                         title="Move right"
//                                                     >
//                                                         <IconChevronRight size={16} />
//                                                     </button>
//                                                 )}
//                                             </div>
//
//                                             {/* Image index */}
//                                             <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//                                                 {index + 1}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//
//                         {/* Sizes */}
//                         <div>
//                             <div className="flex items-center justify-between mb-3">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                                     Available Sizes
//                                 </label>
//                                 <button
//                                     type="button"
//                                     onClick={addSizeField}
//                                     className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
//                                 >
//                                     <IconPlus size={16} className="mr-1" />
//                                     Add Size
//                                 </button>
//                             </div>
//
//                             <div className="space-y-3">
//                                 {product.sizes.map((size, index) => (
//                                     <div key={index} className="flex space-x-3 items-center">
//                                         <input
//                                             type="text"
//                                             value={size.size}
//                                             onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
//                                             placeholder="Size (e.g., S, M, L, XL)"
//                                             className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
//                                         />
//                                         <input
//                                             type="number"
//                                             value={size.price}
//                                             onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
//                                             placeholder="Additional Price"
//                                             min="0"
//                                             step="0.01"
//                                             className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => deleteSizeField(index)}
//                                             className="text-red-500 hover:text-red-700 p-2"
//                                         >
//                                             <IconTrash size={16} />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Colors */}
//                         <div>
//                             <div className="flex items-center justify-between mb-3">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                                     Available Colors
//                                 </label>
//                                 <button
//                                     type="button"
//                                     onClick={addColorField}
//                                     className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
//                                 >
//                                     <IconPlus size={16} className="mr-1" />
//                                     Add Color
//                                 </button>
//                             </div>
//
//                             <div className="space-y-3">
//                                 {product.colors.map((color, index) => (
//                                     <div key={index} className="flex space-x-3 items-center">
//                                         <input
//                                             type="text"
//                                             value={color.color}
//                                             onChange={(e) => handleColorChange(index, 'color', e.target.value)}
//                                             placeholder="Color name"
//                                             className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
//                                         />
//                                         <input
//                                             type="number"
//                                             value={color.price}
//                                             onChange={(e) => handleColorChange(index, 'price', e.target.value)}
//                                             placeholder="Additional Price"
//                                             min="0"
//                                             step="0.01"
//                                             className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => deleteColorField(index)}
//                                             className="text-red-500 hover:text-red-700 p-2"
//                                         >
//                                             <IconTrash size={16} />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Submit Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
//                             <button
//                                 type="button"
//                                 onClick={handleSubmit}
//                                 disabled={loading}
//                                 className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                             >
//                                 {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
//                             </button>
//
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-md transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default EditProduct;
// components/admin/EditProduct.jsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import {
    IconArrowLeft,
    IconPlus,
    IconTrash,
    IconChevronLeft,
    IconChevronRight,
    IconX
} from '@tabler/icons-react';
import { FileUpload } from '@/components/ui/file-upload';

// Categories - adjust this based on your project structure
import { Categories } from '@/public/Categories';

const EditProduct = ({ isEdit = false, productId = null }) => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [product, setProduct] = useState({
        name: '',
        category: [],
        tagline: '',
        description: '',
        price: '',
        stock: '',
        all_images: [],
        sizes: [],
        colors: [],
    });

    // Get product ID from params if editing
    const currentProductId = productId || params?.id;
    const isEditing = isEdit || !!currentProductId;

    useEffect(() => {
        if (isEditing && currentProductId) {
            fetchProduct();
        }
    }, [isEditing, currentProductId]);

    const fetchProduct = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/products/${currentProductId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const data = await response.json();
            const productData = data.data || data;
            setProduct(productData);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Failed to fetch product data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setProduct((prevProduct) => {
            const newCategories = checked
                ? [...prevProduct.category, value]
                : prevProduct.category.filter((category) => category !== value);
            return { ...prevProduct, category: newCategories };
        });
    };

    const handleImageChange = (newFiles) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            all_images: [...prevProduct.all_images, ...newFiles],
        }));
    };

    const handleDeleteImage = (index) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            all_images: prevProduct.all_images.filter((_, i) => i !== index),
        }));
    };

    const swapImages = (index1, index2) => {
        const newImages = [...product.all_images];
        [newImages[index1], newImages[index2]] = [newImages[index2], newImages[index1]];
        setProduct((prevProduct) => ({ ...prevProduct, all_images: newImages }));
    };

    const handleSizeChange = (index, field, value) => {
        const newSizes = [...product.sizes];
        newSizes[index][field] = value;
        setProduct((prevProduct) => ({ ...prevProduct, sizes: newSizes }));
    };

    const handleColorChange = (index, field, value) => {
        const newColors = [...product.colors];
        newColors[index][field] = value;
        setProduct((prevProduct) => ({ ...prevProduct, colors: newColors }));
    };

    const addSizeField = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            sizes: [...prevProduct.sizes, { size: '', price: '' }],
        }));
    };

    const addColorField = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            colors: [...prevProduct.colors, { color: '', price: '' }],
        }));
    };

    const deleteSizeField = (index) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            sizes: prevProduct.sizes.filter((_, i) => i !== index),
        }));
    };

    const deleteColorField = (index) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            colors: prevProduct.colors.filter((_, i) => i !== index),
        }));
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();

        // Append product data
        formData.append('name', product.name);
        formData.append('category', JSON.stringify(product.category));
        formData.append('tagline', product.tagline);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('stock', product.stock);
        formData.append('sizes', JSON.stringify(product.sizes));
        formData.append('colors', JSON.stringify(product.colors));

        if (isEditing) {
            const existingImages = product.all_images
                .map((image, index) => isValidUrl(image) ? { image, index } : null)
                .filter(item => item !== null);
            formData.append('existingImages', JSON.stringify(existingImages));
        }

        // Append new images only
        product.all_images.forEach((image) => {
            if (!isValidUrl(image)) {
                formData.append('all_images', image);
            }
        });

        try {
            const url = isEditing ? `/api/products/${currentProductId}` : '/api/products';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save product');
            }

            // Navigate back to admin panel
            router.push('/admin?tab=products');
        } catch (error) {
            console.error('Error saving product:', error);
            setError(error.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin?tab=products');
    };

    if (loading && isEditing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{isEditing ? 'Edit Product' : 'Add New Product'} - Admin Panel</title>
            </Head>

            <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={handleCancel}
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
                        >
                            <IconArrowLeft size={20} className="mr-2" />
                            Back to Products
                        </button>

                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? 'Edit Product' : 'Add New Product'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            {isEditing ? 'Update product information and settings' : 'Create a new product for your store'}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {/* Product Form */}
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tagline *
                                </label>
                                <input
                                    type="text"
                                    name="tagline"
                                    value={product.tagline}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        {/* Price and Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Stock Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Categories
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-neutral-700">
                                {Categories.map((category) => (
                                    <label key={category.name} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={category.name}
                                            checked={product.category.includes(category.name)}
                                            onChange={handleCategoryChange}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Product Images
                            </label>

                            {/* File Upload Component */}
                            <div className="mb-6">
                                <FileUpload onChange={handleImageChange} />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                                    Upload multiple images. The first image will be the main product image.
                                </p>
                            </div>

                            {/* Image Gallery */}
                            {product.all_images.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Uploaded Images ({product.all_images.length})
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {product.all_images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={isValidUrl(image) ? image : URL.createObjectURL(image)}
                                                    alt={`Product ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                                                />

                                                {/* Image controls */}
                                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center space-x-2">
                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => swapImages(index, index - 1)}
                                                            className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
                                                            title="Move left"
                                                        >
                                                            <IconChevronLeft size={16} />
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteImage(index)}
                                                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <IconX size={16} />
                                                    </button>

                                                    {index < product.all_images.length - 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => swapImages(index, index + 1)}
                                                            className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
                                                            title="Move right"
                                                        >
                                                            <IconChevronRight size={16} />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Image index and main indicator */}
                                                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                                                    <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                                        {index + 1}
                                                    </span>
                                                    {index === 0 && (
                                                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                            Main
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sizes */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available Sizes
                                </label>
                                <button
                                    type="button"
                                    onClick={addSizeField}
                                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <IconPlus size={16} className="mr-1" />
                                    Add Size
                                </button>
                            </div>

                            <div className="space-y-3">
                                {product.sizes.map((size, index) => (
                                    <div key={index} className="flex space-x-3 items-center">
                                        <input
                                            type="text"
                                            value={size.size}
                                            onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                            placeholder="Size (e.g., S, M, L, XL)"
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
                                        />
                                        <input
                                            type="number"
                                            value={size.price}
                                            onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                            placeholder="Additional Price"
                                            min="0"
                                            step="0.01"
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteSizeField(index)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <IconTrash size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available Colors
                                </label>
                                <button
                                    type="button"
                                    onClick={addColorField}
                                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <IconPlus size={16} className="mr-1" />
                                    Add Color
                                </button>
                            </div>

                            <div className="space-y-3">
                                {product.colors.map((color, index) => (
                                    <div key={index} className="flex space-x-3 items-center">
                                        <input
                                            type="text"
                                            value={color.color}
                                            onChange={(e) => handleColorChange(index, 'color', e.target.value)}
                                            placeholder="Color name"
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
                                        />
                                        <input
                                            type="number"
                                            value={color.price}
                                            onChange={(e) => handleColorChange(index, 'price', e.target.value)}
                                            placeholder="Additional Price"
                                            min="0"
                                            step="0.01"
                                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteColorField(index)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <IconTrash size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProduct;