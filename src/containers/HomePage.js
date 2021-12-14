import React from 'react';
import { Bar } from 'react-chartjs-2';

import Breadcrumb from 'common/components/Breadcrumb';
import Card from 'common/components/Card';
import MainLayout from 'layouts/MainLayout';

const rand3 = () => Math.round(Math.random() * 20 - 10);

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			type: 'line',
			label: 'Dataset 1',
			borderColor: 'rgb(54, 162, 235)',
			borderWidth: 2,
			fill: false,
			data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()]
		},
		{
			type: 'bar',
			label: 'Dataset 2',
			backgroundColor: 'rgb(255, 99, 132)',
			data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
			borderColor: 'white',
			borderWidth: 2
		},
		{
			type: 'bar',
			label: 'Dataset 3',
			backgroundColor: 'rgb(75, 192, 192)',
			data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3(), rand3()]
		}
	]
};

const Home = () => {
	return (
		<MainLayout>
			<div className='content-header py-3'>
				<Breadcrumb>Dashboard</Breadcrumb>
			</div>
			<div className='content-body'>
				<Card header='MultiType Chart'>
					<Bar data={data} />
				</Card>
			</div>
		</MainLayout>
	);
};

export default Home;
