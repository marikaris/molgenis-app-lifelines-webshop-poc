<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <FacetOption label="facet option" :active=false></FacetOption>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
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
