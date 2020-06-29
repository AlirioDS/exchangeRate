<template lang='pug'>
  b-container(fluid)
    b-row
      b-col( lg="6" class="my-1")
        b-form-group(
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        )
          b-input-group(size="sm")
            b-form-input(
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            )
    b-table(
      hover=''
      responsive=''
      sticky-header
      :items="items"
      :fields="fields"
      :filter="filter"
    )
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
          { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
          { isActive: false, age: 9, name: { first: 'Mini', last: 'Navarro' } },
          { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
          { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
          { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
          { isActive: true, age: 87, name: { first: 'Larsen', last: 'Shaw' } },
          { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
          { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
          { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
        ],
        fields: [
          { key: 'name', label: 'Person Full name' },
          { key: 'age', label: 'Person age' },
          { key: 'isActive', label: 'is Active' },
          { key: 'actions', label: 'Actions' }
        ],
        filter: null
      }
    }
  }
</script>
