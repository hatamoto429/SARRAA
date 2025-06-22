<template>
  <h1 class="title">Manage Your Account</h1>

  <div class="form-card">
    <div class="form-content">
      <div class="form-grid">
        <!-- Single rows with label + input aligned -->
        <div class="form-row">
          <label>Username</label>
          <input v-model="profile.username" disabled />
        </div>

        <div class="form-row">
          <label>Password</label>
          <input v-model="profile.password" disabled />
        </div>

        <div class="form-row">
          <label>Full Name</label>
          <input v-model="profile.full_name" />
        </div>

        <div class="form-row">
          <label>Email</label>
          <div>
            <input v-model="profile.email" />
            <small v-if="profile.email && !isValidEmail(profile.email)" class="error-text">Invalid email
              format</small>
          </div>
        </div>

        <div class="form-row">
          <label>Phone Number</label>
          <div>
            <input v-model="profile.phone_number" />
            <small v-if="profile.phone_number && !isValidPhone(profile.phone_number)" class="error-text">Invalid phone
              number</small>
          </div>
        </div>

        <div class="form-row">
          <label>Date of Birth</label>
          <div>
            <input v-model="profile.date_of_birth" placeholder="YYYY-MM-DD" />
            <small v-if="profile.date_of_birth && !isValidDate(profile.date_of_birth)" class="error-text">Date must be
              in YYYY-MM-DD format</small>
          </div>
        </div>

        <div class="form-row">
          <label>Shipping Address</label>
          <input v-model="profile.shipping_address" />
        </div>

        <div class="form-row">
          <label>Bank Account Number</label>
          <input v-model="profile.bank_account_number" />
        </div>

        <div class="form-row">
          <label>Credit Card Number</label>
          <div>
            <input v-model="profile.credit_card_number" />
            <small v-if="profile.credit_card_number && !isValidCard(profile.credit_card_number)"
              class="error-text">Invalid credit card number</small>
          </div>
        </div>

        <div class="form-row">
          <label>Paypal Info</label>
          <input v-model="profile.paypal_info" />
        </div>

        <div class="form-row">
          <label>Wallet Amount</label>
          <div>
            <input type="number" v-model="profile.wallet_amount" />
            <small v-if="profile.wallet_amount !== '' && !isValidAmount(profile.wallet_amount)"
              class="error-text">Invalid amount</small>
          </div>
        </div>

        <div class="form-row">
          <label>Wallet Password</label>
          <div>
            <input type="number" v-model="profile.wallet_password" />
            <small v-if="profile.wallet_password !== '' && !isValidAmount(profile.wallet_password)"
              class="error-text">Invalid password</small>
          </div>
        </div>
      </div>
    </div>

    <div class="form-footer">
      <button :disabled="!canSubmit" @click="saveChanges">Save Changes</button>
    </div>
  </div>

  <ActionBar />
</template>




<script>
import axios from 'axios';
import useUserStore from '@/store/userStore.js'
import ActionBar from '@/components/common/ActionBar.vue';

export default {
  components: {
    ActionBar
  },
  name: "AccountPage",
  data() {
    return {
      profile: {
        username: '',
        password: '',
        full_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        shipping_address: '',
        bank_account_number: '',
        credit_card_number: '',
        paypal_info: '',
        wallet_amount: '',
        wallet_password: '',
      },
      originalProfile: null,
    };
  },
  async mounted() {
    const userStore = useUserStore();
    const username = userStore.username;

    console.log(username);

    try {
      const response = await axios(`http://localhost:5002/api/user/profile/${username}`);
      this.profile = response.data;
      this.originalProfile = JSON.parse(JSON.stringify(response.data));
    } catch (error) {
      console.log("Could not load User Data ", error);
    }
  },
  computed: {
    isFormValid() {
      return (
        this.isValidEmail(this.profile.email) &&
        this.isValidDate(this.profile.date_of_birth) &&
        this.isValidPhone(this.profile.phone_number) &&
        this.isValidCard(this.profile.credit_card_number) &&
        this.isValidAmount(this.profile.wallet_amount)
      );
    },
    hasChanges() {
      return JSON.stringify(this.profile) !== JSON.stringify(this.originalProfile);
    },
    canSubmit() {
      return this.isFormValid && this.hasChanges;
    }
  },
  methods: {
    // Allow empty or null values — only reject if not empty AND invalid format
    isValidEmail(email) {
      return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    isValidDate(date) {
      return !date || /^\d{4}-\d{2}-\d{2}$/.test(date);
    },
    isValidPhone(phone) {
      return !phone || /^\d{6,20}$/.test(phone);
    },
    isValidCard(card) {
      return !card || /^\d{4,20}$/.test(card);
    },
    isValidAmount(amount) {
      return amount === '' || amount === null || !isNaN(parseFloat(amount));
    },
    async saveChanges() {
      try {
        const { username, password, ...editableFields } = this.profile;
        await axios.put(`http://localhost:5002/api/user/profile/${username}`, editableFields);
        alert('Profile updated!');
      } catch (error) {
        console.log("Profile update failed ", error);
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  padding: 2rem;
  background: #f0f0f0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.form-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  height: 70vh;
  overflow: hidden;
}

.form-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 1rem;
  align-items: center;
}

label {
  font-weight: bold;
  color: #555;
  text-align: right;
}

input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

input:disabled {
  background-color: #eee;
  color: #777;
}

small.error-text {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
  display: block;
}

.form-footer {
  border-top: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
}

.form-footer button {
  padding: 0.6rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.form-footer button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.nav-links {
  margin-top: 1.5rem;
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-size: 0.95rem;
}

.nav-links a:hover {
  color: #007bff;
}
</style>
