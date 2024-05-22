import axios from "axios";

export const soapApi = async (url: string, soapData: string, config: any) => {
	try {
		const result = await axios
			.post(url, soapData, config)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.error(error);
				return null;
			});

		return result;
	} catch (error) {
		console.log(error);
	}
};

const generateBasicAuthHeader = (username: any, password: any) => {
	const credentials = `${username}:${password}`;
	const encodedCredentials = btoa(credentials);
	return `Basic ${encodedCredentials}`;
};

export const generateSoapHeaders = (soapAction: string) => {
	const authHeader = generateBasicAuthHeader("imsj_p", "Mn22tp16");
	return {
		headers: {
			"Content-Type": "text/xml;charset=UTF-8",
			SOAPAction: soapAction,
			Authorization: authHeader,
		},
	};
};
