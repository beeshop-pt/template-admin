<template>
    <div class="container-fuild">

        <template v-if="!props.inverted">
            <div class="tabs" :class="props.class">
                <ul>
                    <li v-for="([identifier, tabData], index) in tabs" :key="identifier"
                        :class="[(activeTab == identifier) ? 'is-active ' : '', tabData.style]">
                        <a :id="index + '-' + slugify(tabData.name)" @click.prevent="setActiveTab(identifier)"
                            v-html="tabData.name"></a>
                    </li>
                </ul>
            </div>
        </template>
        <div class="tab-body">
            <slot></slot>
        </div>
        <template v-if="props.inverted">
            <div class="tabs inverted" :class="props.class">
                <ul>
                    <li v-for="[identifier, tabData] in tabs" :key="identifier"
                        :class="[(activeTab == identifier) ? 'is-active ' : '', tabData.style]">
                        <a @click.prevent="setActiveTab(identifier)" v-html="tabData.name"></a>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useTabs } from '@/composables/tabs'
export default defineComponent({
    props: {
        inverted: {
            required: false,
            default: false
        },
        class: {
            required: false,
            default: []
        }
    },
    name: 'Tabs',
    setup(props) {
        const { tabs, setActiveTab, activeTab } = useTabs()

        return {
            tabs,
            props,
            setActiveTab,
            activeTab
        }
    },
})
</script>

<style scoped>
.tabs.inverted ul {
    border-bottom-color: none;
    border-bottom-style: none;
    border-bottom-width: 0px;
    border-top-color: hsl(0, 0%, 86%);
    border-top-style: solid;
    border-top-width: 1px;
}

.tabs.inverted {
    margin-top: 1.5rem;
}

.tabs.inverted li.is-active a {
    border-top-color: #4e5e7d;
    color: #4e5e7d;
    font-weight: bold;
}

.tabs.inverted a {
    align-items: center;
    border-top-color: hsl(0, 0%, 86%);
    border-top-style: solid;
    border-top-width: 1px;
    color: hsl(0, 0%, 29%);
    display: flex;
    justify-content: center;
    margin-top: -1px;
    padding: 0.5em 1em;
    vertical-align: top;
}
</style>