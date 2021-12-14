import React, { useEffect, useState } from 'react';

import Breadcrumb from 'common/components/Breadcrumb';
import Card from 'common/components/Card';
import MainLayout from 'layouts/MainLayout';
import CustomForm from 'modules/products/CustomForm';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { getCookie } from 'common/utils/session';
import httpRequest from 'common/utils/httpRequest';

const EditProduct = () => {
	const router = useHistory();
	const params = useParams();

	const [state, setState] = useState({
		data: {
			product: {}
		},
		loadings: {
			product: false
		}
	});

	useEffect(() => {
		setState((prevState) => ({
			...prevState,
			loadings: {
				...prevState.loadings,
				product: true
			}
		}));
		httpRequest
			.get({
				url: `/products/${params.productId}`,
				token: getCookie('token')
			})
			.then((response) => {
				if (!response.data.success) {
					console.log('Error');
					return;
				}
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						product: response.data.data
					}
				}));
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setState((prevState) => ({
					...prevState,
					loadings: {
						...prevState.loadings,
						product: false
					}
				}));
			});
	}, [params.productId]);

	const EnhancedForm = withFormik({
		mapPropsToValues: () => ({
			title: state.data.product.tensp,
			content: state.data.product.chitiet,
			category: state.data.product.id_dm,
			brand: state.data.product.id_th,
			image: null,
			price: state.data.product.gia,
			quantity: state.data.product.so_luong,
			availability: Boolean(Number(state.data.product.khadung)),
			img_url: `http://localhost:8000/images/${state.data.product.hinh}`
		}),
		validationSchema: Yup.object({
			image: Yup.mixed()
				.test('fileSize', 'File too large', (value) => value === null || (value && value.size <= 2048 * 1024))
				.test(
					'fileFormat',
					'Unsupported Format',
					(value) =>
						value === null || (value && ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type))
				),
			title: Yup.string().required('Title is required').max(166, 'Name is maximum 166 characters'),
			content: Yup.string().required('Detail is required').max(1000, 'Content is maximum 1000 characters'),
			category: Yup.number().integer('Invaild category').required('Select category'),
			brand: Yup.number().integer('Invaild brand').required('Select brand'),
			price: Yup.number().integer('Invaild price').required('Price is required'),
			quantity: Yup.number().integer('Invaild quantity').required('Quantity is required'),
			availability: Yup.bool().oneOf([true, false], 'Availability invalid')
		}),
		handleSubmit: async (values, { setSubmitting, setErrors }) => {
			try {
				const response = await httpRequest.formDataPut({
					url: `/products/${params.productId}`,
					token: getCookie('token'),
					data: {
						title: values.title,
						content: values.content,
						category: values.category,
						brand: values.brand,
						price: values.price,
						quantity: values.quantity,
						availability: values.availability
					},
					files: {
						image: values.image
					}
				});
				if (response.data.success) {
					router.push(`/products/lists`);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setSubmitting(false);
			}
		},
		displayName: 'CreateProductForm'
	})(CustomForm);

	return (
		<MainLayout>
			<div className='content-header py-3'>
				<Breadcrumb>Edit product</Breadcrumb>
			</div>
			<div className='content-body'>
				<Card header='Create product'>{state.loadings.product ? <div>Loading...</div> : <EnhancedForm />}</Card>
			</div>
		</MainLayout>
	);
};

export default EditProduct;
