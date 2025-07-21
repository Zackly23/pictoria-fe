<script setup>
import { ref, computed } from 'vue'

const customer = ref({ name: 'Quin Kelley', email: 'regilacez' })
const billDate = ref('2024-09-27')
const products = ref([{ name: 'Trial Product @ 150', price: 150.0, quantity: 1 }])
const tax = ref(18.0)
const selectedPayment = ref('saved')
const paymentMode = ref('test')

const subtotal = computed(() => {
  return products.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
})

const total = computed(() => subtotal.value + tax.value)

const formattedDateRange = computed(() => {
  const start = new Date(billDate.value)
  const end = new Date(start)
  end.setDate(start.getDate() + 1)
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
})

const closeModal = () => {
  alert('Modal closed')
}

const cancel = () => {
  alert('Cancelled')
}

const schedule = () => {
  alert('Subscription scheduled')
}
</script>

<template>
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Create New Subscription</h2>
      <button class="close-btn" @click="closeModal">&times;</button>
    </div>

    <div class="modal-body">
      <!-- Customer Details -->
      <div class="section">
        <h3 class="section-title">Customer Details</h3>
        <div class="customer-info">
          <span class="customer-badge">OK</span>
          <span>{{ customer.name }}</span>
        </div>
        <div class="customer-name">{{ customer.name }}</div>
        <div class="customer-email">{{ customer.email }}</div>
      </div>

      <!-- Subscription Details -->
      <div class="section">
        <h3 class="section-title">Subscription Details</h3>
        <div class="form-group">
          <label class="form-label">Add Bill Start Date</label>
          <input type="date" class="form-input" v-model="billDate" />
        </div>
      </div>

      <!-- Products -->
      <div class="section">
        <h3 class="section-title">Products</h3>
        <table class="products-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Tax</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td>
                <input type="text" class="product-input" v-model="product.name" />
              </td>
              <td>
                $
                <input
                  type="number"
                  class="product-input price-input"
                  v-model.number="product.price"
                />
              </td>
              <td>
                <input
                  type="number"
                  class="product-input quantity-input"
                  v-model.number="product.quantity"
                />
              </td>
              <td>$ {{ tax.toFixed(2) }} <span class="info-icon">i</span></td>
              <td>$ {{ (product.price * product.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="billing-period">
          <svg class="calendar-icon" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M5 1V0H3v1H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2V0h-2v1H5z"
            />
          </svg>
          {{ formattedDateRange }}
        </div>
      </div>

      <!-- Summary -->
      <div class="summary-section">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>$ {{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Taxes <span class="info-icon">i</span></span>
          <span>$ {{ tax.toFixed(2) }}</span>
        </div>
        <a href="#" class="coupon-link">Add Coupon Code</a>

        <div class="summary-row total">
          <span>Amount Due</span>
          <span>$0.00</span>
        </div>
        <div class="summary-row total">
          <span>Amount Due After Trial</span>
          <span>$ {{ total.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="section">
        <h3 class="section-title">Add a Payment Method <span class="info-icon">i</span></h3>
        <div class="payment-methods">
          <label class="payment-method" :class="{ active: selectedPayment === 'saved' }">
            <input type="radio" name="payment" value="saved" v-model="selectedPayment" />
            <span>Saved Cards</span>
          </label>
          <label class="payment-method" :class="{ active: selectedPayment === 'new' }">
            <input type="radio" name="payment" value="new" v-model="selectedPayment" />
            <span>Add New Card</span>
          </label>
        </div>
        <div class="card-info">
          <div class="visa-icon">VISA</div>
          <div class="card-details">
            <div>Visa Ending in X-4242</div>
            <div>Expiry 12/25</div>
          </div>
        </div>
      </div>

      <!-- Additional Options -->
      <details class="additional-options">
        <summary>Additional options</summary>
        <div class="form-group">
          <label class="form-label">Payment Mode</label>
          <div class="payment-mode">
            <label class="mode-option">
              <input type="radio" name="mode" value="test" v-model="paymentMode" />
              <span>Test</span>
            </label>
            <label class="mode-option">
              <input type="radio" name="mode" value="live" v-model="paymentMode" />
              <span>Live</span>
            </label>
          </div>
        </div>
      </details>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary" @click="cancel">Cancel</button>
      <button class="btn btn-primary" @click="schedule">Schedule</button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
.modal {
  font-family: 'Inter', sans-serif;
}
</style>
