// pages/admin/products/edit/page.jsx
"use client";
// import { useRouter } from 'next/router';
import EditProduct from '../../../../../components/admin/EditProduct';
import {useParams} from "next/navigation";

export default function EditProductPage() {
    const params = useParams();
    const {id}=params

    return <EditProduct isEdit={true} productId={id} />;
}