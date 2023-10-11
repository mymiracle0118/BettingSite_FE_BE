<script>
/**
 * Right sidebar component
 */
export default {
    components: {},
    data() {
        return {
            config: {
                handler: this.handleRightBarClick,
                middleware: this.middleware,
                events: ["click"],
            },
        };
    },

    methods: {
        hide() {
            this.$parent.toggleRightSidebar();
        },
        // eslint-disable-next-line no-unused-vars
        handleRightBarClick(e, el) {
            this.$parent.hideRightSidebar();
        },
        // eslint-disable-next-line no-unused-vars
        middleware(event, el) {
            return !event.target.classList.contains("toggle-right");
        },
    },
};
</script>

<template>
<div>
</div>
</template>

<style lang="scss"></style>
