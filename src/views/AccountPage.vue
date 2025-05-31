<template>
  <div class="account-container">

    <!-- Title -->
    <h1 class="message">Manage Your Account</h1>
    <div class="account-tab">

      <div class="user-data">

        <!-- User Info -->
        <label>Username (locked)</label>
        <input v-model="profile.username" disabled />

        <label>Password (displayed)</label>
        <input v-model="profile.password" disabled />

        <label>Full Name</label>
        <input v-model="profile.full_name" />

        <label>Email</label>
        <input v-model="profile.email" />
        <span v-if="profile.email && !isValidEmail(profile.email)" style="color:red; font-size: 0.9em;">
          Invalid email format
        </span>

        <label>Phone Number</label>
        <input v-model="profile.phone_number" />
        <span v-if="profile.phone_number && !isValidPhone(profile.phone_number)" style="color:red; font-size: 0.9em;">
          Invalid phone number
        </span>

        <label>Date of Birth</label>
        <input v-model="profile.date_of_birth" placeholder="YYYY-MM-DD" />
        <span v-if="profile.date_of_birth && !isValidDate(profile.date_of_birth)" style="color:red; font-size: 0.9em;">
          Date must be in YYYY-MM-DD format
        </span>

        <label>Shipping Address</label>
        <input v-model="profile.shipping_address" />

        <label>Bank Account Number</label>
        <input v-model="profile.bank_account_number" />

        <label>Credit Card Number</label>
        <input v-model="profile.credit_card_number" />
        <span v-if="profile.credit_card_number && !isValidCard(profile.credit_card_number)"
          style="color:red; font-size: 0.9em;">
          Invalid credit card number
        </span>

        <label>Paypal Info</label>
        <input v-model="profile.paypal_info" />

        <label>Wallet Amount</label>
        <input type="number" v-model="profile.wallet_amount" />
        <span v-if="profile.wallet_amount !== '' && !isValidAmount(profile.wallet_amount)"
          style="color:red; font-size: 0.9em;">
          Invalid amount
        </span>

        <label>Wallet Password</label>
        <input v-model="profile.wallet_password" />

        <button :disabled="!canSubmit" @click="saveChanges">Save</button>

      </div>

      <!-- Return Buttons-->
      <div class="return-options">
        <router-link to="/" class="redirect-button">
          <h1>Back To Login</h1>
        </router-link>
        <router-link to="/home" class="redirect-button">
          <h1>Back To Home</h1>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import useUserStore from '@/store/userStore.js'

export default {
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

<style>
.account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  padding: 30px;
}

.account-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
}

.user-data {
  display: flex;
  flex-direction: column;
  max-height: 20vw;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #838383;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.error {
  text-align: center;
  font-size: 45px;
}

.message {
  text-align: center;
}

.info {
  font-size: 10px;
}

.info .user-info {
  border: 2px, black;
  font-size: 5px;
}

.info .bank-info {
  font-size: 5px;
}

.redirect-button {
  color: rgb(0, 0, 0);
  padding: 20px;
  font-size: 12px;
  font-weight: bold;
  transition: font-size 0.3s ease;
}

.redirect-button:hover {
  transform: scale(1.2);
}

.return-options {
  display: flex;
  flex-direction: row;
}
</style>
