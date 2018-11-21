<template>
    <b-container fluid>
        <b-row>
            <b-column>
                <FacetOption label=test :active=false></FacetOption>
            </b-column>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import FacetOption from '../components/FacetOption.vue';

    export default Vue.extend({
        name: 'LifelinesWebshop',
        components: {FacetOption},
        props: {
            msg: String,
        },
    });
</script>
