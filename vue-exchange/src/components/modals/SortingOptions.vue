<template lang="pug">
  b-modal(
    id="modalSorting"
    centered=true 
    v-model="openModalSortingOptions"
    title="Sorting Option Client Amount"
    headerClass="header-modal"
    hideHeaderClose=true
    hide-footer
  )
    b-container.p-0
      b-row(align-h="center").p-4
        b-col(cols="12" sm="3" md="3" class="text-center").p-2
          b-button(
            @click="filterWithCustomerAmount = !filterWithCustomerAmount"
            :variant="this.filterWithCustomerAmount === false ? 'primary' : 'danger' "
          ) {{ filterWithCustomerAmount === false ? 'Activate' : 'Disabled'  }}
        b-col(cols="12" sm="9" md="9").p-2
          b-input-group
            b-input-group-prepend
              span.input-group-text
                font-awesome-icon(icon='money-check-alt')
            b-form-input(
              v-model="customerAmount"
              type="number"
              placeholder="Enter Customer Amount"
              :disabled="!filterWithCustomerAmount"
            ) 
        b-col(cols="6" sm="6" md="6").pt-3
          b-button(
            v-b-modal.modalTabletAgents
            class="mt-4 text-center"
            variant="success"
            block
          ) NEXT
</template>

<script>
export default {
  data() {
    return {
      filterWithCustomerAmount: false
    }
  },
  computed: {
    customerAmount: {
      get() {
        return this.$store.state.customerAmount
      },
      set(customerAmount) {
        this.$store.commit('CUSTOMER_AMOUNT', customerAmount)
      }
    },
    openModalSortingOptions: {
      get() {
        return this.$store.state.modals.openModalSortingOptions
      },
      set(openModalSortingOptions) {
        this.$store.commit('MODALS', openModalSortingOptions)
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
</style>
