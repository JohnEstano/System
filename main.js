const findMyState = () => {
    const status = document.querySelector('.status');

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

        fetch(geoApiUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);  
                if (data.address) {
                    const building = data.address.building || '';
                    const road = data.address.road || '';
                    const city = data.address.city || data.address.town || data.address.village || '';
                    const specificLocation = `${building}, ${road}, ${city}`;
                    status.textContent = specificLocation.trim() || 'No specific location found';
                } else {
                    status.textContent = 'Unable to retrieve location details';
                }
            })
            .catch(error => {
                console.error('Error:', error);  
                status.textContent = 'Unable to retrieve location details';
            });
    };

    const error = () => {
        status.textContent = 'Unable to retrieve your location';
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        status.textContent = 'Geolocation is not supported by this browser.';
    }
};

document.querySelector('.find-state').addEventListener('click', findMyState);
