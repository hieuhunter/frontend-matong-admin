import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestedAction } from 'redux/Action/loginAction';
import * as yup from 'yup';
import { Formik } from 'formik';
import classNames from 'classnames';
const Login = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.auth.login);

	const initialValues = {
		user_name: '',
		password: ''
	};
	const validationSchema = yup.object({
		user_name: yup.string().required('User name is required'),
		password: yup.string().required('Password is required')
	});

	const onSubmit = (values) => {
		const user = {
			user_name: values.user_name,
			password: values.password
		};
		console.log(user);
		dispatch(loginRequestedAction(user));
	};
	return (
		<>
			<div className='container'>
				<div className='card card-container' style={{ background: '#a284d1' }}>
					{/* <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> */}
					<img id='profile-img' className='profile-img-card' src='//ssl.gstatic.com/accounts/ui/avatar_2x.png' alt='' />
					<p id='profile-name' className='profile-name-card' />
					<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
						{(props) => (
							<form onSubmit={props.handleSubmit} className='form-signin'>
								<span id='reauth-email' className='reauth-email' />
								<input
									type='text'
									className={classNames('form-control', {
										'is-invalid': (props.touched.user_name && props.errors.user_name) || login.errors?.user_name
									})}
									placeholder='Tai khoan'
									id='user_name'
									name='user_name'
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.user_name}
								/>
								{props.touched.user_name && props.errors.user_name && (
									<div id='invalid-feedback'>{props.errors.user_name}</div>
								)}
								{login.errors?.user_name && <div className='invalid-feedback'>{login.errors?.user_name}</div>}
								<input
									type='password'
									className={classNames('form-control', {
										'is-invalid': props.touched.password && props.errors.password
									})}
									placeholder='Mat khau'
									id='password'
									name='password'
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.password}
								/>
								{props.touched.password && props.errors.password && (
									<div id='invalid-feedback'>{props.errors.password}</div>
								)}
								{login.errors?.user && <div className='invalid-feedback'>{login.errors?.user}</div>}
								<div id='remember' className='checkbox'>
									<label>
										<input type='checkbox' defaultValue='remember-me' /> Remember me
									</label>
								</div>
								{login.is_loading ? (
									<button className='btn btn-lg btn-primary btn-block btn-signin' type='submit' disabled={props}>
										Sign in
									</button>
								) : (
									<button className='btn btn-lg btn-primary btn-block btn-signin' type='submit'>
										Sign in
									</button>
								)}
							</form>
						)}
					</Formik>
					{/* /form */}
				</div>
				{/* /card-container */}
			</div>
			{/* /container */}
		</>
	);
};
export default Login;
