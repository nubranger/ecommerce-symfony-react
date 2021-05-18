
function fetchJson(url, options) {
    let headers = {'Content-Type': 'application/json'};
    if (options && options.headers) {
        headers = {...options.headers, ...headers};
        delete options.headers;

    }

    return fetch(url, Object.assign({
        credentials: 'same-origin',
        headers: headers
    }, options))
        .then(checkStatus)
        .then(response => {
            // decode JSON, but avoid problems with empty responses
            return response.text()
                .then(text => text ? JSON.parse(text) : '')
        });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error
}

export function getProducts() {
    return fetchJson('/products')
        .then((response) => response);
}

export function deleteProducts(id) {
    return fetchJson(`/products/${id}`, {
        method: 'DELETE'
    });
}

export function createProducts(Product) {
    return fetchJson('/products', {
        method: 'POST',
        body: JSON.stringify(repLog)
    });
}