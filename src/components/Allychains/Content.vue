<template>
    <div id="content">
        <v-card flat>
            <v-card-text>
                <div class="allychain_header">
                    <div class="subheading">Allychainwork</div>
                    <h2>{{ allychainID | allychain }}</h2>
                </div>
                <ContentMetadata
                    :total-blockchains="allychain.blockchains.length"
                    :total-validators="allychain.validators.length"
                    :total-nominators="allychain.nominators.length"
                    :total-control-keys="allychain.controlKeys.length"
                />
                <v-tabs v-model="tab" show-arrows class="head-border">
                    <v-tab href="#validators">Validators</v-tab>
                    <v-tab href="#pending-validators">Pending Validators</v-tab>
                    <v-tab href="#blockchains">Blockchains</v-tab>
                    <v-tab href="#control-keys">Control Keys</v-tab>
                    <v-tab href="#nominations">Nominations</v-tab>
                    <v-tab-item class="tab_content" value="validators">
                        <template v-if="allychain.validators.length === 0">
                            <p class="null">
                                There are no validators for this allychain.
                            </p>
                        </template>
                        <template v-else>
                            <ValidatorDataTable
                                :validators="allychain.validators"
                                :allychain-i-d="allychainID"
                                :allychain="allychain"
                                :title="'Validators'"
                                class="table_margin"
                            />
                        </template>
                    </v-tab-item>
                    <v-tab-item class="tab_content" value="pending-validators">
                        <template
                            v-if="allychain.pendingValidators.length === 0"
                        >
                            <p class="null">
                                There are no pending validators for this
                                allychain.
                            </p>
                        </template>
                        <template v-else>
                            <ValidatorDataTable
                                :validators="allychain.pendingValidators"
                                :allychain-i-d="allychainID"
                                :allychain="allychain"
                                :title="'Pending Validators'"
                                class="table_margin"
                            />
                        </template>
                    </v-tab-item>
                    <v-tab-item class="tab_content" value="blockchains">
                        <template v-if="allychain.blockchains.length === 0">
                            <p class="null">
                                There are no blockchains for this allychain.
                            </p>
                        </template>
                        <template v-else>
                            <BlockchainDataTable
                                :blockchains="allychain.blockchains"
                                :title="'Blockchains'"
                                :links="true"
                                class="table_margin"
                            />
                        </template>
                    </v-tab-item>
                    <v-tab-item class="tab_content" value="control-keys">
                        <template v-if="allychain.controlKeys.length === 0">
                            <p class="null">
                                There are no control keys for this allychain.
                            </p>
                        </template>
                        <template v-else>
                            <ControlKeyTable
                                :allychain="allychain"
                                :title="'Control Keys'"
                                class="table_margin"
                            />
                        </template>
                    </v-tab-item>
                    <v-tab-item class="tab_content" value="nominations">
                        <template v-if="allychain.nominators.length === 0">
                            <p class="null">
                                There are no nominated stakes for this
                                allychain.
                            </p>
                        </template>
                        <template v-else>
                            <NominationDataTable
                                :validators="allychain.nominators"
                                :allychain-i-d="allychainID"
                                :allychain="allychain"
                                :title="'Nominations'"
                                class="table_margin"
                            />
                        </template>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'
import Allychain from '@/js/Allychain'
import { AXIA_ALLYCHAIN_ID } from '@/store/modules/platform/platform'
import ContentMetadata from '@/components/Allychains/ContentMetadata.vue'
import ValidatorDataTable from '@/components/Validators/ValidatorDataTable.vue'
import BlockchainDataTable from '@/components/Blockchain/BlockchainDataTable.vue'
import NominationDataTable from '@/components/Validators/NominationDataTable.vue'
import ControlKeyTable from '@/components/Validators/ControlKeyTable.vue'

@Component({
    components: {
        ContentMetadata,
        ValidatorDataTable,
        BlockchainDataTable,
        ControlKeyTable,
        NominationDataTable,
    },
})
export default class Content extends Vue {
    dense = true
    fixedHeader = true
    defaultAllychainID: string = AXIA_ALLYCHAIN_ID
    currentTime: number | null = null
    startTimes: number[] = []
    endTimes: number[] = []
    minTime = 0
    maxTime = 1
    absolute = false

    @Prop() allychainID!: string
    @Prop() allychain!: Allychain

    get mode(): string {
        return this.absolute ? 'absolute' : 'relative'
    }

    get modeText() {
        return this.absolute ? 'Timeline' : 'Completion'
    }

    get tab() {
        return this.$route.query.tab
    }

    set tab(tab: string | (string | null)[]) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
    }
}
</script>

<style scoped lang="scss">
.allychain_count {
    margin-top: 5px;
}

.bar {
    margin-bottom: 15px;
}

.tab_content {
    padding-top: 15px;
}

.v-card__text {
    padding-top: 0;
    box-sizing: border-box;
    border-radius: 0 !important;
    padding-left: 16px;
}
.v-tab {
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: #178fe1 !important;
}

.v-tab--active {
    color: white !important;
    background: #178fe1;
    margin: 2px;
    border-radius: 12px;
}
.v-tab:before {
    background-color: $primary-color !important;
}

.allychain_header {
    color: #178fe1;

    .subheading {
        text-transform: capitalize;
        font-size: 12px;
        font-weight: 400;
    }

    h2 {
        color: $primary-color;
        margin: 0;
        padding-top: 0;
        font-size: 24px;
    }
}

.null {
    padding: 10px 0 0 16px;
    font-size: 0.75rem;
    font-weight: 400;
}

.table_image {
    height: 20px;
    display: inline-block;
    margin-top: -4px;
    margin-right: 8px;
    vertical-align: middle;
}

.text-right {
    text-align: right !important;
}

.duration_text_container {
    margin-top: -20px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
    width: 100%;
}

.now {
    position: absolute;
    top: -11px;
    font-size: 12px;
    background-color: $primary-color;
    height: calc(100% + 22px);
    width: 1px;
    z-index: 5;
}

.percentage_text {
    position: absolute;
    text-align: right;
    top: 0;
    width: 50px;
    color: $black;
    font-size: 12px;
    z-index: 3;
}

.pad {
    padding-top: 9px;
}

@include smOnly {
    .v-card__text {
        padding-left: 16px;
        padding-right: 0;
    }
}

@include xsOrSmaller {
    .allychain_header {
        padding: 0;
    }
}
</style>

<style lang="scss">
.v-application .primary--text {
    color: $primary-color !important;
    caret-color: $primary-color !important;
}

.theme--light.v-tabs > .v-tabs-bar--show-arrows {
    background-color: $white !important;
}

.v-tabs-slider,
.v-tabs-slider-wrapper {
    height: 0;
    color: none;
    background-color: none;
    display: none;
}
th {
    .v-input--selection-controls {
        padding-top: 0;
    }
    .v-label {
        font-size: 0.75rem;
    }
    .v-messages {
        display: none;
    }
}

#content {
    .v-tabs-bar__content {
        border: 1px solid #178fe1;
        border-radius: 12px;
    }

    .table_margin {
        margin-left: 1px;
    }

    a.v-tab {
        display: flex;

        &:hover {
            text-decoration: none;
        }
    }
}
</style>
