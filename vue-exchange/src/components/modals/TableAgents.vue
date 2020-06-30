<template lang="pug">
  b-modal(
    id="modalTabletAgents"
    centered=true 
    v-model="showModalTabletAgents"
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
              font-awesome-icon(icon='search' style="color: #2EC4B6;")
        b-col(cols="12" sm="12" md="12" class="text-center").pt-2
          b-table(
            hover=''
            responsive=''
            sticky-header
            :items="agents"
            :fields="fields"
            :filter="filterAgents"
            :busy="this.$store.state.agent.loading"
          )
            template(v-slot:table-busy='')
              .text-center.text-success.my-2
                b-spinner(style='width: 10rem; height: 10rem;', label='Large Spinner', type='grow')
            
            template(v-slot:cell(data.bank_name)="bankName")
              b.text-secondary {{ bankName.value.replace(/[^a-zA-Z]+/g, ' ') }}
            
            template(v-slot:cell(data.min_amount)="minAmount")
              b.text-secondary {{ minAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            
            template(v-slot:cell(data.max_amount)="maxAmount")
              b.text-secondary {{ maxAmount.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              
        b-col(cols="6" sm="6" md="6").pt-3
          b-button(class="mt-4 text-center" variant="success" block) NEXT
</template>

<script>
export default {
  data() {
    return {
      showModalTabletAgents: false,
      filterAgents: null,
      fields: [ 
        { 
          key: 'data.bank_name', label: 'Bank', thClass: 'table-header-sell'
        },
        {
          key: 'data.min_amount', label: 'Min Amount', thClass: 'table-header-sell'
        },
        {
          key: 'data.max_amount', label: 'Max Amount', thClass: 'table-header-sell'
        }
      ]
    }
  },
  computed: {
    agents: {
      get() {
        if(this.$store.state.filterClient.isActive) {
          return this.$store.getters.agentsFilterByAmount
        } else {
          return this.$store.getters.agentsFilter
        }
      }
    }
  }
}
</script>

<style>
  .table-header-sell {
    background-color: #2EC4B6!important;
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
