class APIData {
    constructor() {
        this.accessToken = null;

        // Don't change these.
        this.id = 'b2166e80-b732-4408-92f1-c53a523f2123';
        this.secret = '79c0063046539713e1ad99c3a2ab24e2fd787bd37adca581e11cbc951fdac583';

        this.products = [];
        this.loaded = false;
        // Get the Access Token on initialisation.
        this.getAccessToken().then((token) => {
            this.accessToken = token.access_token;
            this.getProducts().then((products) => {
                this.products = products;
                this.loaded = true;
            })
        });
    }

    async getAccessToken() {
        let d = await fetch('https://hallam.sci-toolset.com/api/v1/token/', {
            method: 'POST',
            body: 'grant_type=password&username=hallam-a&password=z[97V<WM',
            headers: {
                'Accept': '*/*',
                'Authorization': 'Basic ' + btoa(this.id + ":" + this.secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })

        if (d.ok) {
            return await d.json();
        }
    }

    // Get a given number of products (default = 62)
    async getProducts(amt = 62) {
        let products = [];

        // Get the list of product IDs.
        let productIDs = await fetch('https://hallam.sci-toolset.com/discover/api/v1/products/search', {
            method: 'POST',
            body: `{"size":${amt}, "keywords":""}`,
            headers: {
                'Accept': '*/*',
                'Authorization': 'Bearer ' + this.accessToken,
                'Content-Type': 'application/json'
            }
        })

        // Load the data of each Product.
        if (productIDs.ok) {
            productIDs = await productIDs.json();

            for (let p of productIDs.results.searchresults) {
                let productData = await fetch("https://hallam.sci-toolset.com/discover/api/v1/products/" + p.id, {
                    headers: {
                        Authorization: 'Bearer ' + this.accessToken,
                    },
                })

                products.push(await productData.json());
            }
        }

        return products;
    }






    // Input a api function url and return that data.
    // async getReq(ApiFunc) {
    //     const url = 'https://hallam.sci-toolset.com/discover/api/v1/' + ApiFunc;
    //     let d = await fetch(url, {
    //         headers: {
    //             Authorization: 'Bearer ' + this.accessToken,
    //         },
    //     })

    //     if (d.ok) {
    //         return await d.json();
    //     }
    // }
}