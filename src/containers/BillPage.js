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
import timeFormat from 'common/utils/timeFormat';

const Total = function (arr, prop) {
	return arr.reduce(function (a, b) {
		return a + b[prop];
	}, 0);
};

const List_Bill = () => {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);

	const { data: bill, mutate } = useSWR(`/bill?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}`, {
		revalidateOnFocus: false
	});

	const onDeletePostClicked = async (id) => {
		try {
			if (window.confirm('Do you want to delete?')) {
				const response = await httpRequest.delete({
					url: `/bill/${id}`,
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

	const list = bill?.data.map((i) => {
		return {
			id: i.id,
			id_kh: i.id_kh,
			id_hd: i.id_hd,
			id_sp: i.id_sp,
			ho_ten: i.ho_ten,
			dia_chi: i.dia_chi,
			ngay_dat: i.ngay_dat,
			ngay_giao: i.ngay_giao,
			so_luong: (i.so_luong = 33),
			gia: (i.gia = 1293400)
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
				Header: 'Địa chỉ',
				accessor: 'dia_chi',
				width: 'auto'
			},
			{
				Header: 'Ngày đặt',
				accessor: 'ngay_dat',
				width: '12%',
				Cell: ({ value }) => timeFormat(value)
			},
			{
				Header: 'Ngày giao',
				accessor: 'ngay_giao',
				width: '12%',
				Cell: ({ value }) => timeFormat(value)
			},
			{
				Header: 'Sô lượng',
				accessor: 'so_luong',
				width: '12%'
			},
			{
				Header: 'Tổng tiền',
				accessor: 'gia',
				width: '12%'
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
				<Breadcrumb>List_bill</Breadcrumb>
			</div>
			<div className='content-body'>
				<Card header='List bill'>
					{!bill ? (
						<TableLoading />
					) : (
						<Table
							data={data}
							columns={columns}
							setPage={setPage}
							setLimit={setLimit}
							currentPage={page}
							limit={limit}
							total={bill?.meta?.total}
						/>
					)}
				</Card>
			</div>
		</MainLayout>
	);
};

export default List_Bill;
