<template>
    <b-button :variant="variant" :active="active">{{label}}</b-button>
</template>

<script lang="ts">
    export default {
        name: 'FacetOption',
        props: {
            label: {
                type: String,
                required: true,
            },
            active: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        computed: {
            variant () {
                return this.active ? "primary" : "outline-primary"
            }
        }
    };
</script>

<style scoped>

</style>
