export const getOptions = (query, variables) => {
  return {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: query,
        variables: variables
    })
  };
}

const handleResponse = async (response: Response): Promise<any> => {
    try {
        const json = await response.json();
        return json
    } catch (error) {
        return error;
    }
}

const handleError = (error: any): void => {
    console.error('Error:', error);
}

export const fetchData = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const { data } = await handleResponse(response);
        return data;
    } catch (error) {
        handleError(error);
        return error;
    }
}

