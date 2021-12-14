import httpRequest from 'common/utils/httpRequest';

const fetcher = async (url) => {
	const response = await httpRequest.get({
		url: url,
		token: window.localStorage.getItem('token')
	});
	return response.data;
};

export default fetcher;
