<template>
    <div id='app'>
        <div class='container'>
            <form>
                <label class='InputLabel'>Pick-up Location</label>
                <input class='Input' type='text' placeholder='city, airport, station, region, district...' :list='autocompleteOptions'>
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
                connectionString: 'https://cors.io/?https://www.rentalcars.com/FTSAutocomplete.do',
                autocompleteOptions: null,
                requiredNumerOfResults: 6,
                index : 'fts_en'
            }
        },
        mounted() {
            const inputContainer = document.getElementsByClassName('container')[0];
            const inputField = document.getElementsByClassName('Input')[0];
            inputContainer.addEventListener('click', this.changeFocusToInput);
            inputField.addEventListener('keyup', this.inputEvent);
        },
        methods: {
            changeFocusToInput() {
                const focalElement = document.getElementsByClassName('Input')[0];
                focalElement.focus();
            },
            async inputEvent() {
                const inputElement = document.getElementsByClassName('Input')[0];
                let result;
                if(inputElement.value.length > 1) {
                    result = await axios.post(this.connectionString, {solrIndex: this.index, solrRows: this.requiredResults, solrTerm: inputElement.vale});
                    //unable to get a response, keep getting an error for the response blocked by CORS policy: 
                    //Response to preflight request doesn't pass access control check: 
                    //No 'Access-Control-Allow-Origin' header is present on the requested resource.
                }
                if(result) {
                    this.autocompleteOptions = result;
                }
                else {
                    this.autocompleteOptions = ['No results found'];
                }
            }
        },
    };
</script>
<style scoped lang='scss'>
.Input {
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
.InputLabel {
    color: #444;
    font-size: 1em;
    padding-bottom: 5px;
    display: block;
}
.container {
    width: 90%;
    @media (min-width: 540px) {
        padding: 0 5%;        
    }
    @media (min-width: 1000px) {
        width: 430px;
    }
}
</style>