import React, { useMemo, useState } from 'react';
import useSWR from 'swr';

import Breadcrumb from 'common/components/Breadcrumb';
import Card from 'common/components/Card';
import Table from 'common/components/Table';
import TableLoading from 'common/components/TableLoading';
import pageNumber from 'common/utils/pageNumber';
import MainLayout from 'layouts/MainLayout';
import { getCookie } from 'common/utils/session';
import httpRequest from 'common/utils/httpRequest';

const ListCustomer = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);

	const { data: customer, mutate } = useSWR(`/customer?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}`, {
		revalidateOnFocus: false
	});

	const onDeletePostClicked = async (id) => {
		try {
			if (window.confirm('Do you want to delete?')) {
				const response = await httpRequest.delete({
					url: `/customer/${id}`,
					token: getCookie('token')
				});
				if (response.data.success) {
					await mutate();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const list = customer?.data.map((i) => {
		return {
			id: i.id,
			ho_ten: i.ho_ten,
			user_name: i.user_name,
			email: i.email,
			sdt: i.sdt,
			dia_chi: i.dia_chi
		};
	});

	const data = useMemo(() => list, [list]);

	const columns = useMemo(
		() => [
			{
				Header: 'Họ và tên',
				accessor: 'ho_ten',
				width: 'auto'
			},
			{
				Header: 'Tài khoản',
				accessor: 'user_name',
				width: 'auto'
			},
			{
				Header: 'Email',
				accessor: 'email',
				width: '12%'
			},
			{
				Header: 'Số điện thoại',
				accessor: 'sdt',
				width: '15%'
			},
			{
				Header: 'Địa chỉ',
				accessor: 'dia_chi',
				width: '20%'
			},
			{
				Header: 'Actions',
				id: 'actions',
				accessor: 'id',
				Cell: (data) => (
					<div className='text-center'>
						{console.log(data.value)}
						<button className='btn btn-danger me-2' onClick={onDeletePostClicked.bind(this, data.value)}>
							Delete
						</button>
					</div>
				),
				width: '15%'
			}
		],
		[]
	);

	return (
		<MainLayout>
			<div className='content-header py-3'>
				<Breadcrumb>List customer</Breadcrumb>
			</div>
			<div className='content-body'>
				<Card header='List customer'>
					{!customer ? (
						<TableLoading />
					) : (
						<Table
							data={data}
							columns={columns}
							setPage={setPage}
							setLimit={setLimit}
							currentPage={page}
							limit={limit}
							total={customer?.meta?.total}
						/>
					)}
				</Card>
			</div>
		</MainLayout>
	);
};

export default ListCustomer;
