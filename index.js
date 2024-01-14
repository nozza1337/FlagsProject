const getCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const flaginfo = document.querySelector(".flaginfo")
        const searchInput = document.getElementById('searchInput')
        const darkModeToggle = document.getElementById("darkModeToggle")


        function renderCountries(filteredCountries) {
            flaginfo.innerHTML = ''

            filteredCountries.forEach(country => {
                const productInfoDiv = document.createElement("div");
                const image = document.createElement("img");



                image.src = country.flags.png;
                productInfoDiv.append(image)
                productInfoDiv.innerHTML += `<h1>${country.name.common}</h1>`
                productInfoDiv.innerHTML += `<p> Population:${country.population} </p>`
                productInfoDiv.innerHTML += `<p> Region:${country.region} </p>`
                productInfoDiv.innerHTML += `<p> Capital:${country.capital} </p>`

                flaginfo.appendChild(productInfoDiv);
            });
        }


        renderCountries(countries);



        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm))
            renderCountries(filteredCountries)
        });




        regionDropdown.addEventListener('change', () => {
            const selectedRegion = regionDropdown.value;
            const filteredCountries = selectedRegion ? countries.filter(country => country.region === selectedRegion) : countries
            renderCountries(filteredCountries);
        });



        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });

    } catch (error) {
        console.log(error);
    }
};
getCountries();

