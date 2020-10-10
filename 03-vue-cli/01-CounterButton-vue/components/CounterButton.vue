<template>
    <button @click="increaseCount()">{{ count }}</button>
</template>

<script>
export default {
    name: 'CounterButton',

    props: {
        count: {
            type: Number,
            default: 0,
        }
    },

    model: {
        prop: 'count',
        event: 'increment',
    },

    methods: {
        increaseCount() {
            return this.$emit('increment', this.count + 1)
        }
    }
};
</script>

<style></style>
