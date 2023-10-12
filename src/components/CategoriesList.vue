<template>
  <div id="categoriesList">
    <div class="d-flex justify-content-between">
      <h2>Categories List</h2>
      <button class="btn btn-primary mb-3" @click="openAddModal">Add Category</button>
    </div>

    <v-data-table :headers="headers" :items="categoriesObjects" :search="search" :loading="loading">
      <template v-slot:item.actions="{ item, index }">
        <v-icon small @click="openEditModal(index)">mdi-pencil</v-icon>
        <v-icon small @click="openDeleteModal(index)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <!-- Edit Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Category</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedCategory">
            <!-- Form fields to edit category data -->
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" v-model="selectedCategory.name">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="editCategory">Save</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Category</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Form fields to add a new category -->
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" v-model="newCategory">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addCategory">Add</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Deletion</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this category?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteCategory">Delete</button>
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CategoriesList',
  data() {
    return {
      categories: [],
      newCategory: '',
      addModal: false,
      deleteModal: false,
      selectedCategory: null,
      loading: false,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      search: '',
      baseUrl: 'https://fakestoreapi.com',
      categoriesObjects: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get(`${this.baseUrl}/products/categories`)
        .then((response) => {
          console.log('categories', response);
          this.categories = response.data;
          this.categoriesObjects = this.categories.map((str, index) => ({ name: str, id: index + 1 }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openAddModal() {
      $('#addModal').modal('show');
    },
    addCategory() {
      this.categories.push(this.newCategory);
      this.categoriesObjects = this.categories.map((str, index) => ({ name: str, id: index + 1 }));
      $('#addModal').modal('hide');
    },
    openEditModal(category) {
      this.selectedCategory = { index: category, name: this.categories[category] };
      $('#editModal').modal('show');
    },
    editCategory() {
      this.categories[this.selectedCategory.index] = this.selectedCategory.name;
      this.categoriesObjects = this.categories.map((str, index) => ({ name: str, id: index + 1 }));
      $('#editModal').modal('hide');
    },
    openDeleteModal(category) {
      this.selectedCategory = category;
      $('#deleteModal').modal('show');
    },
    deleteCategory() {
      this.categories.splice(this.selectedCategory, 1);
      this.categoriesObjects = this.categories.map((str, index) => ({ name: str, id: index + 1 }));
      $('#deleteModal').modal('hide');
    },
    closeDeleteModal() {
      this.selectedCategory = null;
      $('#deleteModal').modal('hide');
    },
  },
};
</script>

<style scoped>
#categoriesList {
  padding: 20px;
}
</style>