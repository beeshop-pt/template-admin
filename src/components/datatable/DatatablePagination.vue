<template>
    <datatable-render-pagination :data="data" :limit="limit" :show-disabled="showDisabled" :size="size" :align="align"
        v-on:pagination-change-page="onPaginationChangePage">

        <template
            v-slot="{ data, limit, showDisabled, size, align, computed, prevButtonEvents, nextButtonEvents, pageButtonEvents }">

            <ul class="pagination-list" :class="{
                'is-small': size == 'small',
                'is-large': size == 'large',
                'justify-content-center': align == 'center',
                'justify-content-end': align == 'right'
            }" v-if="computed.total > computed.perPage">

                <li :class="{ 'disabled': !computed.prevPageUrl }" v-if="computed.prevPageUrl || showDisabled">
                    <a class="pagination-link" href="#" aria-label="Previous" :tabindex="!computed.prevPageUrl && -1"
                        v-on="prevButtonEvents">
                        <slot name="prev-nav">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">{{ $t('datatable_pagination.previous')}}</span>
                        </slot>
                    </a>
                </li>

                <li v-for="(page, key) in computed.pageRange" :key="key">
                    <a class="pagination-link" :class="{ 'is-current': page == computed.currentPage }" href="#"
                        v-on="pageButtonEvents(page)">
                        {{ page }}
                        <span class="sr-only" v-if="page == computed.currentPage">{{ $t('datatable_pagination.current')}}</span>
                    </a>
                </li>

                <li :class="{ 'disabled': !computed.nextPageUrl }" v-if="computed.nextPageUrl || showDisabled">
                    <a class="pagination-link" href="#" aria-label="Next" :tabindex="!computed.nextPageUrl && -1"
                        v-on="nextButtonEvents">
                        <slot name="next-nav">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">{{ $t('datatable_pagination.next')}}</span>
                        </slot>
                    </a>
                </li>

            </ul>

        </template>


    </datatable-render-pagination>
</template>

<script>
export default {
    emits: ['pagination-change-page'],
    props: {
        data: {
            type: Object,
            default: () => { }
        },
        limit: {
            type: Number,
            default: 0
        },
        showDisabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default',
            validator: value => {
                return ['small', 'default', 'large'].indexOf(value) !== -1;
            }
        },
        align: {
            type: String,
            default: 'left',
            validator: value => {
                return ['left', 'center', 'right'].indexOf(value) !== -1;
            }
        }
    },
    methods: {
        onPaginationChangePage(page) {
            this.$emit('pagination-change-page', page);
        }
    },
}
</script>
