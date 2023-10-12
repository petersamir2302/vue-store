<template>
  <div id="productsList">
    <div class="d-flex justify-content-between">
      <h2>Products List</h2>
      <button class="btn btn-primary mb-3" @click="openAddModal">Add Product</button>
    </div>

    <v-data-table :headers="headers" :items="products" :search="search" :loading="loading">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="openEditModal(item)">mdi-pencil</v-icon>
        <v-icon small @click="openDeleteModal(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>


    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Add Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedProduct">
            <!-- Form fields to enter product data -->
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" v-model="selectedProduct.title">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input type="text" class="form-control" v-model="selectedProduct.price">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <select class="form-select" v-model="selectedProduct.category">
                    <option v-for="cat in categories" :value="cat">{{ cat }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" v-model="selectedProduct.description"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="editProduct">Save</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Add Product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Form fields to enter product data -->
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" class="form-control" v-model="newProduct.title">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input type="text" class="form-control" v-model="newProduct.price">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="category" class="form-label">Category</label>
                  <select class="form-select" v-model="newProduct.category">
                    <option v-for="cat in categories" :value="cat">{{ cat }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" v-model="newProduct.description"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addProduct">Add</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Deletion</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this product?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteProduct">Delete</button>
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
  name: 'ProductsList',
  data() {
    return {
      products: [],
      newProduct: {
        title: '',
        price: '',
        category: '',
        description: ''
      },
      addModal: false,
      deleteModal: false,
      selectedProduct: null,
      loading: false,
      headers: [
        { text: 'Name', value: 'title' },
        { text: 'Price', value: 'price', width: 100 },
        { text: 'Category', value: 'category' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      search: '',
      loading: false,
      baseUrl: 'https://fakestoreapi.com',
      categories: []
    };
  },
  mounted() {
    this.fetchProducts();
    this.getCategories();
  },
  methods: {
    fetchProducts() {
      try {
        axios.get(`${this.baseUrl}/products`).then((response) => {
          console.log('products', response);
          this.products = response.data;
        }).catch(error => {
          console.error(error);
        });
      } catch (error) {
        console.error(error);
      }
    },
    openEditModal(product) {
      this.selectedProduct = product;
      $('#editModal').modal('show');
    },
    openDeleteModal(product) {
      this.selectedProduct = product;
      $('#deleteModal').modal('show');
    },
    openAddModal() {
      // Open the add modal
      $('#addModal').modal('show');
    },
    closeAddModal() {
      // Close the add modal
      this.addModal = false;
      // Reset the newProduct data
      this.newProduct = {
        title: '',
        price: '',
        category: '',
        description: ''
      };
    },
    closeDeleteModal() {
      $('#deleteModal').modal('hide');
      this.selectedProduct = null;
    },
    addProduct() {

      axios.post(`${this.baseUrl}/products`, this.newProduct)
        .then(response => {
          this.products.push(response.data);
          $('#addModal').modal('hide');
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteProduct() {
      this.products = this.products.filter(item => item.id != this.selectedProduct.id);
      this.closeDeleteModal();
    },
    editProduct() {
      axios.put(`${this.baseUrl}/products/${this.selectedProduct.id}`, this.selectedProduct)
        .then(response => {
          this.selectedProduct = response.data;
          let itemIndex = this.products.indexOf(this.products.find(item => item.id === this.selectedProduct.id));
          this.products[itemIndex] = this.selectedProduct;
          $('#editModal').modal('hide');
        })
        .catch(error => {
          console.error(error);
        });
    },
    getCategories() {

      axios.get(`${this.baseUrl}/products/categories`)
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  background: #fff;
  border-radius: 5px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  margin: 0;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>