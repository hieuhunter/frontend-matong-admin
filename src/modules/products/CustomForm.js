import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';
import useSWR from 'swr';

import ImageInput from 'common/components/ImageInput';

const CustomForm = ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
	setFieldValue,
	setFieldTouched,
	isSubmitting
}) => {
	const { data: categories } = useSWR(`/categories`, {
		revalidateOnFocus: false
	});

	const { data: brands } = useSWR(`/brands`, {
		revalidateOnFocus: false
	});

	return (
		<form onSubmit={handleSubmit} className='row'>
			<div className='mb-3 col-12'>
				<ImageInput
					name='image'
					id='image'
					onChange={setFieldValue}
					onBlur={setFieldTouched}
					previewUrl={values.img_url}
				/>
				{errors.image && touched.image && <div className='invalid-feedback d-block'>{errors.image}</div>}
			</div>
			<div className='mb-3 col-12'>
				<label htmlFor='title' className='form-label'>
					Title <span className='text-danger'>*</span>
				</label>
				<input
					type='text'
					placeholder='Enter title'
					className={classNames('form-control', {
						'is-invalid': errors.title && touched.title
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.title}
					name='title'
					id='title'
				/>
				{errors.title && touched.title && <div className='invalid-feedback'>{errors.title}</div>}
			</div>
			<div className='mb-3 col-12'>
				<label htmlFor='content' className='form-label'>
					Detail <span className='text-danger'>*</span>
				</label>
				<textarea
					rows='5'
					type='text'
					placeholder='Enter detail'
					className={classNames('form-control', {
						'is-invalid': errors.content && touched.content
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.content}
					name='content'
					id='content'
				/>
				{errors.content && touched.content && <div className='invalid-feedback'>{errors.content}</div>}
			</div>
			<div className='mb-3 col-md-6'>
				<label htmlFor='category' className='form-label'>
					Category <span className='text-danger'>*</span>
				</label>
				<select
					className={classNames('form-select', {
						'is-invalid': errors.category && touched.category
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.category}
					name='category'
					id='category'
					disabled={!categories || isEmpty(categories?.data)}
				>
					{!categories ? (
						<option value=''>Loading...</option>
					) : isEmpty(categories?.data) ? (
						<option value=''>Empty category</option>
					) : (
						<>
							<option value=''>Select category</option>
							{categories?.data?.map((category) => (
								<option value={category.id} key={category.id}>
									{category.ten_dm}
								</option>
							))}
						</>
					)}
				</select>
				{errors.category && touched.category && <div className='invalid-feedback'>{errors.category}</div>}
			</div>
			<div className='mb-3 col-md-6'>
				<label htmlFor='brand' className='form-label'>
					Brand <span className='text-danger'>*</span>
				</label>
				<select
					className={classNames('form-select', {
						'is-invalid': errors.brand && touched.brand
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.brand}
					name='brand'
					id='brand'
					disabled={!brands || isEmpty(brands?.data)}
				>
					{!brands ? (
						<option value=''>Loading...</option>
					) : isEmpty(brands?.data) ? (
						<option value=''>Empty brand</option>
					) : (
						<>
							<option value=''>Select brand</option>
							{brands?.data?.map((brand) => (
								<option value={brand.id} key={brand.id}>
									{brand.ten_th}
								</option>
							))}
						</>
					)}
				</select>
				{errors.brand && touched.brand && <div className='invalid-feedback'>{errors.brand}</div>}
			</div>
			<div className='mb-3 col-md-6'>
				<label htmlFor='quantity' className='form-label'>
					Quantity <span className='text-danger'>*</span>
				</label>
				<input
					type='number'
					placeholder='Enter quantity'
					className={classNames('form-control', {
						'is-invalid': errors.quantity && touched.quantity
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.quantity}
					name='quantity'
					id='quantity'
				/>
				{errors.quantity && touched.quantity && <div className='invalid-feedback'>{errors.quantity}</div>}
			</div>
			<div className='mb-3 col-md-6'>
				<label htmlFor='price' className='form-label'>
					Price <span className='text-danger'>*</span>
				</label>
				<input
					type='number'
					placeholder='Enter price'
					className={classNames('form-control', {
						'is-invalid': errors.price && touched.price
					})}
					onChange={handleChange}
					onBlur={handleBlur}
					value={values.price}
					name='price'
					id='price'
				/>
				{errors.price && touched.price && <div className='invalid-feedback'>{errors.price}</div>}
			</div>
			<div className='mb-3 col-12'>
				<div className='form-check form-switch'>
					<input
						className={classNames('form-check-input', {
							'is-invalid': errors.availability && touched.availability
						})}
						type='checkbox'
						onChange={() => setFieldValue('availability', !values.availability)}
						onBlur={() => setFieldTouched('availability', true)}
						checked={values.availability}
						id='availability'
						name='availability'
					/>
					<label className='form-check-label' htmlFor='availability'>
						Availability
					</label>
					{errors.availability && touched.availability && <div className='invalid-feedback'>{errors.availability}</div>}
				</div>
			</div>
			<div>
				<button className='btn btn-primary' type='submit' disabled={isSubmitting}>
					Submit
				</button>
			</div>
		</form>
	);
};

export default CustomForm;
