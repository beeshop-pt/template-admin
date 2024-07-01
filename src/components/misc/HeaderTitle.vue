<template>
    <header class="card-header">
        <p class="card-header-title">
            <small class="card-header-hashtag">
                <font-awesome-icon icon="fas fa-hashtag"></font-awesome-icon>
            </small>
            {{ props.title }}
        </p>
    </header>
</template>8
<script setup>
const props = defineProps({
    title: String
})
</script>

<style scoped>
.card-header {
    background-color: transparent;
    -webkit-box-align: stretch;
    align-items: stretch;
    box-shadow: none;
    margin-bottom: 15px;
    display: -webkit-box;
    display: flex;
    border-bottom: 2px solid #dbdbdb;
}

.card-header-title {
    -webkit-box-align: center;
    align-items: center;
    color: #363636;
    display: -webkit-box;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
    font-weight: 700;
    padding: 5px;
}

.card-header-hashtag {
    margin-right: 5px;
}
</style>
