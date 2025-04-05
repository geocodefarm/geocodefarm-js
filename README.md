# Geocode.Farm JavaScript SDK

## Introduction
The official JavaScript SDK for the Geocode.Farm API.

This SDK allows you to easily integrate geocoding (both forward and reverse) into your JavaScript applications.

## Installation

You can include the `geocodefarm.js` file directly in your HTML project, or install it through package managers like npm or yarn.

To use the SDK, simply include the script and initialize it with your API key.

## Example Usage

```html
<script src="https://github.com/geocodefarm/geocodefarm-js/raw/refs/heads/main/geocodefarm.js"></script>
<script>
    const geocode = new GeocodeFarm('your_api_key_here');

    // Example: Forward geocoding
    geocode.forward('1600 Pennsylvania Ave, Washington, DC').then(response => {
        if (response.success) {
            console.log('Coordinates:', response.lat, response.lon);
        } else {
            console.error('Error:', response.error);
        }
    });

    // Example: Reverse geocoding
    geocode.reverse(38.8977, -77.0365).then(response => {
        if (response.success) {
            console.log('Address:', response.full_address);
        } else {
            console.error('Error:', response.error);
        }
    });
</script>
```

## License
This SDK is licensed under **The Unlicense** (public domain).

## Contributing
If you find any bugs or have suggestions, please submit an issue or a pull request.
