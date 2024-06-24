<template>
    <div :class="['column', props.class]">
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
    class: { required: false, default: [] }
})</script>