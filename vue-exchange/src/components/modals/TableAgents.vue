<template lang="pug">
  b-modal(
    id="modalTabletAgents"
    centered=true 
    v-model="openModalTable"
    title="Agents Selection"
    headerClass="header-modal"
    hide-footer
  )
    b-container.p-0
      b-row(align-h="center").pt-2.p-0
        b-col(cols="12" sm="12" md="12" class="text-center")
          .search-bar
            b-form-input(
              v-model="filterAgents"
              type="search"
              id="filterInputAgents"
              placeholder="Search"
            )
            span.search-icon
              font-awesome-icon(
                icon='search' 
                style='color: #011627;'
              )
        b-col(cols="12" sm="12" md="12" class="text-center").pt-2
          b-table(
            hover=''
            responsive=''
            sticky-header
            :items="agents"
            :fields="fields"
            :filter="filterAgents"
            :busy="this.$store.state.agent.loading"
            ref="selectableTable"
            selectable
            :select-mode="selectMode"
            @row-selected="onRowSelected"
          )
            template(v-if="this.$store.state.seller.isSelect && !this.$store.state.buyer.isSelect" v-slot:table-busy='')
              .text-center.text-success.my-2
                b-spinner(style='width: 10rem; height: 10rem;', label='Large Spinner', type='grow')
            
            template(v-else v-slot:table-busy='')
              .text-center.text-danger.my-2
                b-spinner(style='width: 10rem; height: 10rem;', label='Large Spinner', type='grow')
            
            template(v-slot:cell(data.bank_name)="bankName")
              b.text-secondary {{ bankName.value.replace(/[^a-zA-Z]+/g, ' ') }}
            
            template(v-slot:cell(data.min_amount)="minAmount")
              b.text-secondary {{ minAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            
            template(v-slot:cell(data.max_amount)="maxAmount")
              b.text-secondary {{ maxAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
</template>

<script>
export default {
  data() {
    return {
      filterAgents: null,
      selectMode: 'single',
      fields: [ 
        { 
          key: 'data.bank_name', label: 'Bank', thClass: 'table-header'
        },
        {
          key: 'data.min_amount', label: 'Min Amount', thClass: 'table-header'
        },
        {
          key: 'data.max_amount', label: 'Max Amount', thClass: 'table-header'
        }
      ]
    }
  },
  computed: {
    agents: {
      get() {
        return this.$store.getters.agentsFilter
      }
    },
    openModalTable: {
      get() {
        return this.$store.state.modals.openModalTable
      },
      set(openModalTable) {
        this.$store.commit('MODALS', openModalTable )
      }
    },
  },
  methods: {
    onRowSelected(agentSelect) {
      this.$root.$emit("bv::hide::modal", "modalTabletAgents")
      this.$root.$emit("bv::hide::modal", "modalSorting")
      this.$store.commit("AGENT_SELECT", agentSelect)
    }
  }
}
</script>

<style>
  .table-header {
    background-color: #011627!important;
    color: #FDFFFC!important;
  }
  .search-bar {
    position: relative;
  }
  .search-bar input {
    padding-left: 30px;
  }
  .search-icon {
    position: absolute;
    top: 8px;
    left: 8px;
  }
  .close {
    color: #FDFFFC!important;
  }
  .close:hover {
    color: #E71D36!important;
  }
</style>
