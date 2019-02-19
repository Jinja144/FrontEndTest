<template>
    <div id='app'>
        <div class='locationInput__container'>
            <form>
                <label class='locationInput__label'>Pick-up Location</label>
                <input class='locationInput__input' type='text' :placeholder='locationPlaceholderText' :list='locationAutocompleteOptions'>
                <span class='locationInput__input__screen--Reader--Information'>{{locationPlaceholderText}}</span>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'app',
        data: function () {
            return {
                locationPlaceholderText: 'city, airport, station, region, district...',
                connectionString: 'https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en',
                autocompleteOptions: {},
                requiredNumerOfResults: 6,
            }
        },
        mounted() {
            const inputContainer = document.getElementsByClassName('locationInput__container')[0];
            const inputField = document.getElementsByClassName('locationInput__input')[0];
            inputContainer.addEventListener('click', this.changeFocusToInput);
            inputField.addEventListener('keyup', this.inputEvent);
        },
        methods: {
            changeFocusToInput() {
                const focalElement = document.getElementsByClassName('locationInput__input')[0];
                focalElement.focus();
            },
            async inputEvent() {
                const inputElement = document.getElementsByClassName('locationInput__input')[0];
                let result;
                console.log(inputElement.value.length);
                if(inputElement.value.length > 1) {
                    result = await axios.post(this.connectionString, {solrRows: this.requiredResults, solrTerm: inputElement.vale});
                }
                console.log(result);
            }
        },
    };
</script>
<style scoped lang='scss'>
.locationInput__input {
    padding: 12px 10px 12px;
    line-height: 15px;
    width: 100%;
    border-style: solid;
    border-width: 1px;
    border-color: #a9a9a9;
    ::placeholder {
        color: #a9a9a9;
    }    
    @media (min-width: 540px) {
    width: 90%;
    }
}
.locationInput__label {
    color: #444;
    font-size: 1em;
    padding-bottom: 5px;
    display: block;
}
.locationInput__container {
    width: 90%;
    @media (min-width: 540px) {
        padding: 0 5%;        
    }
    @media (min-width: 1000px) {
        width: 430px;
    }
}
.locationInput__input__screen--Reader--Information {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px); 
}
</style>