<template>
    <Poptip trigger="focus">
        <Input v-model="value15" prefix="logo-usd" placeholder="Enter number" style="width: 120px" />
        <div slot="content">{{ formatNumber }}</div>
    </Poptip>
</template>
<script>
    export default {
        data () {
            return {
                value15: ''
            }
        },
        computed: {
            formatNumber () {
                if (this.value15 === '') return 'Enter number';
                function parseNumber(str) {
                    const re = /(?=(?!)(d{3})+$)/g;
                    return str.replace(re, ',');
                }
                return parseNumber(this.value15);
            }
        }
    }
</script>