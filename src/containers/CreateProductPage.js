import React from 'react';

import Breadcrumb from 'common/components/Breadcrumb';
import Card from 'common/components/Card';
import MainLayout from 'layouts/MainLayout';
import CustomForm from 'modules/products/CustomForm';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { getCookie } from 'common/utils/session';
import httpRequest from 'common/utils/httpRequest';

const CreateProductPage = () => {
	const router = useHistory();

	const EnhancedForm = withFormik({
		mapPropsToValues: () => ({
			title: '',
			content: '',
			category: '',
			brand: '',
			image: null,
			price: '',
			quantity: '',
			availability: true
		}),
		validationSchema: Yup.object({
			image: Yup.mixed()
				.required('Image is required')
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
				const response = await httpRequest.formDataPost({
					url: `/products`,
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
				<Breadcrumb>Create product</Breadcrumb>
			</div>
			<div className='content-body'>
				<Card header='Create product'>
					<EnhancedForm />
				</Card>
			</div>
		</MainLayout>
	);
};

export default CreateProductPage;
