<template lang="pug">
  b-modal(
    id="modalSorting"
    centered=true 
    v-model="openModalSortingOptions"
    title="Sorting Option Client Amount"
    headerClass="header-modal"
    hide-footer
  )
    b-container.p-0
      b-row(align-h="center").p-4
        b-col(cols="12" sm="3" md="3" class="text-center").p-2
          b-button(
            @click="filterClientIsActive = !filterClientIsActive"
            :variant="this.filterClientIsActive === false ? 'primary' : 'danger' "
          ) {{ filterClientIsActive === false ? 'Activate' : 'Disabled'  }}
        b-col(cols="12" sm="9" md="9").p-2
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='money-check-alt')
            b-form-input(
              v-model="customerAmount"
              type="number"
              placeholder="Enter Customer Amount"
              :disabled="!filterClientIsActive"
            ) 
        b-col(cols="6" sm="6" md="6").pt-3
          b-button(
            @click="filterByAmount"
            class="mt-4 text-center"
            variant="success"
            block
          ) NEXT
</template>

<script>
export default {
  computed: {
    openModalSortingOptions: {
      get() {
        return this.$store.state.modals.openModalSortingOptions
      },
      set(openModalSortingOptions) {
        this.$store.commit('MODALS', openModalSortingOptions)
      }
    },
    customerAmount: {
      get() {
        return this.$store.state.filterClient.byAmount
      },
      set(customerAmount) {
        this.$store.commit('CUSTOMER_AMOUNT', customerAmount)
      }
    },
    filterClientIsActive: {
      get() {
        return this.$store.state.filterClient.isActive
      },
      set(filterClientIsActive) {
        this.$store.commit('FILTER_CLIENT_IS_ACTIVE', filterClientIsActive)
      }
    },
  },
  methods: {
    filterByAmount() {
      if(this.filterClientIsActive && this.customerAmount != "" ) {
        this.$store.getters.agentsFilterByAmount
        this.$root.$emit("bv::show::modal", "modalTabletAgents")
      } else {
        this.$root.$emit("bv::show::modal", "modalTabletAgents")
      }
    }
  }
}
</script>

<style>
  .header-modal {
    background-color: #011627!important;
    color: #FDFFFC!important;
  }
  .close {
    color: #FDFFFC!important;
  }
  .close:hover {
    color: #E71D36!important;
  }
</style>
