<template>
    <b-container fluid>
        <b-row>
            <b-col md="8">
                <h1>Lifelines data item selection</h1>
            </b-col>
            <b-col md="4">
                <div>
                    <b-button>Save</b-button>
                    <b-button>Reset</b-button>
                    <b-button>Request</b-button>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <Facet :title="this.$store.state.categorical_facets.ageGroup.label" :description="this.$store.state.categorical_facets.ageGroup.description" :options="this.$store.state.categorical_facets.ageGroup.options"></Facet>
                <Facet :title="this.$store.state.categorical_facets.sexGroup.label" :description="this.$store.state.categorical_facets.sexGroup.description" :options="this.$store.state.categorical_facets.sexGroup.options"></Facet>
                <Facet :title="this.$store.state.categorical_facets.subCohorts.label" :description="this.$store.state.categorical_facets.subCohorts.description" :options="this.$store.state.categorical_facets.subCohorts.options"></Facet>
                <Facet :title="this.$store.state.categorical_facets.collectionPoint.label" :description="this.$store.state.categorical_facets.collectionPoint.description" :options="this.$store.state.categorical_facets.collectionPoint.options"></Facet>

            </b-col>
            <b-col>
               Topic Tree
            </b-col>
            <b-col>
                Data items
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Vue from 'vue';
    import Facet from '../components/Facet.vue';

    export default Vue.extend({
        name: 'LifelinesWebshop',
        components: {Facet},
        props: {
            msg: String,
        },
    });
</script>
