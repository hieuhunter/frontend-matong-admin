import React, { useMemo, useState } from 'react';
import useSWR from 'swr';

import Breadcrumb from 'common/components/Breadcrumb';
import Card from 'common/components/Card';
import Table from 'common/components/Table';
import TableLoading from 'common/components/TableLoading';
import pageNumber from 'common/utils/pageNumber';
import MainLayout from 'layouts/MainLayout';
import CustomImage from 'common/components/CustomImage';
import { getCookie } from 'common/utils/session';
import httpRequest from 'common/utils/httpRequest';
import { useHistory } from 'react-router-dom';

const ListArticles = () => {
	const router = useHistory();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);

	const { data: products, mutate } = useSWR(`/sanpham?offset=${(pageNumber(page) - 1) * limit}&limit=${limit}`, {
		revalidateOnFocus: false
	});

	const onDeletePostClicked = async (id) => {
		try {
			if (window.confirm('Do you want to delete?')) {
				const response = await httpRequest.delete({
					url: `/products/${id}`,
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

	const list = products?.data.map((i) => {
		return {
			id: i.id,
			tensp: i.tensp,
			gia: i.gia,
			so_luong: i.so_luong,
			image: i.hinh
		};
	});

	const data = useMemo(() => list, [list]);

	const CellImage = (data) => {
		return (
			data.value && (
				<CustomImage
					src={`http://localhost:8000/images/${data.value}`}
					width={150}
					height={90}
					alt={data.row.original.tensp}
				/>
			)
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Hình',
				accessor: 'image',
				Cell: (data) => CellImage(data)
			},
			{
				Header: 'Tên sản phẩm',
				accessor: 'tensp',
				width: 'auto'
			},
			{
				Header: 'Giá',
				accessor: 'gia',
				width: '12%'
			},
			{
				Header: 'Số lượng',
				accessor: 'so_luong',
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
						<button
							href='/products/edit'
							className='btn btn-info'
							onClick={() => {
								router.push(`/products/edit/${data.value}`);
							}}
						>
							Edit
						</button>
					</div>
				),
				width: '20%'
			}
		],
		[]
	);

	return (
		<MainLayout>
			<div className='content-header py-3'>
				<Breadcrumb>List products</Breadcrumb>
			</div>
			<div className='content-body'>
				<Card header='List products'>
					{!products ? (
						<TableLoading />
					) : (
						<Table
							data={data}
							columns={columns}
							setPage={setPage}
							setLimit={setLimit}
							currentPage={page}
							limit={limit}
							total={products?.meta?.total}
						/>
					)}
				</Card>
			</div>
		</MainLayout>
	);
};

export default ListArticles;
