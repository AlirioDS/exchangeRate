<template lang="pug">
  b-container(fluid='')
    // User Interface controls
    b-row
      b-col.my-1(lg='6')
        b-form-group.mb-0(label='Filter', label-cols-sm='3', label-align-sm='right', label-size='sm', label-for='filterInput')
          b-input-group(size='sm')
            b-form-input#filterInput(v-model='filter', type='search', placeholder='Type to Search')
            b-input-group-append
              b-button(:disabled='!filter', @click="filter = ''") Clear
      b-col.my-1(lg='6')
        b-form-group.mb-0(label='Filter On', label-cols-sm='3', label-align-sm='right', label-size='sm', description='Leave all unchecked to filter on all data')
          b-form-checkbox-group.mt-1(v-model='filterOn')
            b-form-checkbox(value='name') Name
            b-form-checkbox(value='age') Age
            b-form-checkbox(value='isActive') Active
    b-table(show-empty='', small='', stacked='md', :items='items', :fields='fields', :current-page='currentPage', :per-page='perPage', :filter='filter', :filterincludedfields='filterOn', :sort-by.sync='sortBy', :sort-desc.sync='sortDesc', :sort-direction='sortDirection', @filtered='onFiltered')
      template(v-slot:cell(name)='row')
        | {{ row.value.first }} {{ row.value.last }}

</template>

<script>
  export default {
    data() {
      return {
        items: [
          { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
          { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
          {
            isActive: false,
            age: 9,
            name: { first: 'Mini', last: 'Navarro' },
            _rowVariant: 'success'
          },
          { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
          { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
          { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
          {
            isActive: true,
            age: 87,
            name: { first: 'Larsen', last: 'Shaw' },
            _cellVariants: { age: 'danger', isActive: 'warning' }
          },
          { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
          { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
          { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
        ],
        fields: [
          { key: 'name', label: 'Person Full name', sortable: true, sortDirection: 'desc' },
          { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
          {
            key: 'isActive',
            label: 'is Active',
            formatter: (value, key, item) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true,
            sortByFormatted: true,
            filterByFormatted: true
          },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>
