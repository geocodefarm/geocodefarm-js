class GeocodeFarm {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.geocode.farm/';
    }

    async forward(address) {
        const url = `${this.baseUrl}forward/?key=${this.apiKey}&addr=${encodeURIComponent(address)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return this.handleResponse(data, 'forward');
        } catch (error) {
            return { success: false, error: 'Request failed or timed out' };
        }
    }

    async reverse(lat, lon) {
        const url = `${this.baseUrl}reverse/?key=${this.apiKey}&lat=${lat}&lon=${lon}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return this.handleResponse(data, 'reverse');
        } catch (error) {
            return { success: false, error: 'Request failed or timed out' };
        }
    }

    handleResponse(data, type) {
        if (!data || !data.RESULTS) {
            return { success: false, error: 'Invalid response from server' };
        }

        const status = data.STATUS && data.STATUS.status;
        if (status !== 'SUCCESS') {
            return { success: false, error: `API returned failure: ${status || 'Unknown'}` };
        }

        let result = {};
        if (type === 'reverse') {
            const resultData = data.RESULTS.result[0];
            result = {
                house_number: resultData.house_number || null,
                street_name: resultData.street_name || null,
                locality: resultData.locality || null,
                admin_2: resultData.admin_2 || null,
                admin_1: resultData.admin_1 || null,
                country: resultData.country || null,
                postal_code: resultData.postal_code || null,
                formatted_address: resultData.formatted_address || null,
                latitude: resultData.latitude || null,
                longitude: resultData.longitude || null,
            };
            result.accuracy = resultData.accuracy || null;
        } else {
            const resultData = data.RESULTS.result;
            result = {
                house_number: resultData.address.house_number || null,
                street_name: resultData.address.street_name || null,
                locality: resultData.address.locality || null,
                admin_2: resultData.address.admin_2 || null,
                admin_1: resultData.address.admin_1 || null,
                country: resultData.address.country || null,
                postal_code: resultData.address.postal_code || null,
                formatted_address: resultData.address.full_address || null,
                latitude: resultData.coordinates.lat || null,
                longitude: resultData.coordinates.lon || null,
            };
            result.accuracy = resultData.accuracy || null;
        }

        return {
            success: true,
            status_code: data.http_status || 0,
            lat: result.latitude,
            lon: result.longitude,
            accuracy: result.accuracy,
            full_address: result.formatted_address,
            result: result,
        };
    }
}
