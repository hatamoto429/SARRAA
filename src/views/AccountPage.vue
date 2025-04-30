<template>
  <div class="account-container">

    <!-- Title -->
    <h1 class="message">Manage Your Account</h1>

    <div class="info">
      <div class="user-info">
        <h1 class="username">{{ username }}</h1>
        <h1 class="password">{{ password }}</h1>
        <h1 class="dateofbirth">{{ dateofbirth }}</h1>
        <h1 class="address">{{ address }}</h1>
      </div>

      <div class="bank-info">
        <h1 class="bankinfo">{{ bankinfo }}</h1>
        <h1 class="accountnumber">{{ accountnumber }}</h1>
        <h1 class="creditcardnumber">{{ creditcardnumber }}</h1>
        <h1 class="balance">{{ balance }}</h1>
      </div>
    </div>

    <div class="account-tab">

      <!-- Return Button-->
      <router-link to="/" class="redirect-button">
        <h1>Back To Login</h1>
      </router-link>
    </div>

  </div>
</template>

<script>
import { fetchUserData } from '@/utils';

export default {
  name: "AccountPage",
  data() {
    return {
      username: "un",
      password: "pw",
      dateofbirth: "dob",
      address: "add",
      bankinfo: "bi",
      accountnumber: "accn",
      creditcardnumber: "ccn",
      balance: "bl",
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const data = await fetchUserData();
        this.username = data.username;
        this.password = data.password;
        this.dateofbirth = data.dateofbirth;
        this.address = data.address;
        this.bankinfo = data.bankinfo;
        this.accountnumber = data.accountnumber;
        this.creditcardnumber = data.creditcardnumber;
        this.balance = data.balance;
      } catch (error) {
        console.error('Failed to load account data:', error);
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
</style>
