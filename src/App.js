import fetcher from 'common/utils/fetcher';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Routes from 'router';

import { SWRConfig } from 'swr';
import './styles/globals.scss';

function App() {
	return (
		<Provider store={store}>
			<SWRConfig
				value={{
					fetcher: fetcher,
					onError: (error, key) => {
						console.log('Errors: ', error);
						return error.response;
					},
					shouldRetryOnError: false
				}}
			>
				<Routes />
			</SWRConfig>
		</Provider>
	);
}

export default App;
