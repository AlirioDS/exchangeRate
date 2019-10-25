<template>
  <div>
    <b-table
      ref="selectableTable"
      selectable
      :select-mode="selectMode"
      selected-variant="active"
      :items="items"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
    </b-table>
    <p>
      Selected Rows:<br>
      {{ selected }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data() {
      return {
        fields: ['selected', 'age', 'first_name', 'last_name'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
        selectMode: 'single',
        selected: []
      }
    },
    methods: {
      onRowSelected(items) {
        this.selected = items
      }
    }
  }
</script>
