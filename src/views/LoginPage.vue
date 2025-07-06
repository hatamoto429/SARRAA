<template>
  <!-- Loading -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>

  <!-- Login Content -->
  <div v-else class="login-container">
    <!-- Title -->
    <h1 class="title" v-html="titleText"></h1>
    <div class="login-tab">

      <!-- Authentication -->
      <form @submit.prevent="performSarraaCheckAndAuth" class="auth-form">
        <div class="input">
          <label :for="isLoginMode ? 'username' : 'choose_username'">
            {{ isLoginMode ? 'Username' : 'Your Username' }}
          </label>
          <input type="text" :id="isLoginMode ? 'username' : 'choose_username'" v-model="currentUsername" required
            :placeholder="isLoginMode ? 'Enter your username' : 'Choose your username'" />
        </div>
        <div class="input">
          <label :for="isLoginMode ? 'password' : 'choose_password'">
            {{ isLoginMode ? 'Password' : 'Your Password' }}
          </label>
          <input type="password" :id="isLoginMode ? 'password' : 'choose_password'" v-model="currentPassword" required
            :placeholder="isLoginMode ? 'Enter your password' : 'Choose your password'" />
        </div>

        <!-- Submit -->
        <button type="submit" class="submit-button">
          <span class="arrow"></span>
          <span class="submit-text">Proceed</span>
        </button>
      </form>
    </div>
  </div>

  <!-- Switch Mode -->
  <div class="button-container">
    <h2 class="button-title">Select Mode:</h2>
    <div class="button-field">
      <button :class="{ 'active': isLoginMode }" @click="toggleAuthMode(true)" type="button"
        class="button">Login</button>
      <button :class="{ 'active': !isLoginMode }" @click="toggleAuthMode(false)" type="button"
        class="button">Register</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import useUserStore from "@/store/userStore.js"
import checkDynamicContent from "@/utils/sarraaCheck.js"

export default {
  name: "LoginPage",
  data() {
    return {
      isLoading: false,
      isLoginMode: true,
      username: "",
      password: "",
      choose_username: "",
      choose_password: ""
    };
  },
  computed: {
    titleText() {
      return this.isLoginMode
        ? "Good To See You Again,<br>Please Login!"
        : "Welcome New User,<br>Please Enter Your Details!";
    },
    useSarraaCheck: {
      get() {
        return useUserStore().useSarraaCheck;
      },
      set(value) {
        useUserStore().setUseSarraaCheck(value);
      },
    },
    currentUsername: {
      get() {
        return this.isLoginMode ? this.username : this.choose_username;
      },
      set(value) {
        if (this.isLoginMode) {
          this.username = value;
        } else {
          this.choose_username = value;
        }
      }
    },
    currentPassword: {
      get() {
        return this.isLoginMode ? this.password : this.choose_password;
      },
      set(value) {
        if (this.isLoginMode) {
          this.password = value;
        } else {
          this.choose_password = value;
        }
      }
    }
  },
  methods: {
    toggleAuthMode(isLogin) {
      this.isLoginMode = isLogin;
    },

    // OPTIONAL: EXTRACT HANDLE AUTH TO FRONTEND UTILS

    // Authentication
    async performSarraaCheckAndAuth() {

      /* Additional Vulnerability
      if (!this.validateInputs()) {
        return;
      };
      */

      console.log('--- Starting authentication process ---');
      this.isLoading = true;

      try {
        if (this.useSarraaCheck) {
          console.log(`SARRAA ENABLED: Checking inputs.`);

          const inputsToCheck = {
            username: this.currentUsername,
            password: this.currentPassword,
            // add other inputs if needed
          };

          // Check each dynamic input individually and collect predictions
          for (const [field, value] of Object.entries(inputsToCheck)) {
            console.log(`Checking field "${field}" with content:`, value);
            const prediction = await checkDynamicContent(value);
            console.log(`Prediction for "${field}":`, prediction);

            if (prediction === 'malicious') {
              console.warn(`SARRAA - FAILED. Malicious content detected in field "${field}".`);
              alert(`SARRAA - FAILED: Malicious content detected in ${field}.`);
              return; // stop immediately
            }
          }

          console.log('SARRAA - PASSED: No malicious content detected.');
          alert('SARRAA - PASSED: No malicious content detected.');
        } else {
          console.log('SARRAA DISABLED: Skipping security checks.');
          alert('SARRAA DISABLED: Skipping security checks.');
        }

        // Proceed with login or register after checks
        if (this.isLoginMode) {
          await this.handleLogin();
          console.log('Login process completed.');
        } else {
          await this.handleRegister();
          console.log('Registration process completed.');
        }

      } catch (error) {
        console.error('Security check or authentication process failed:', error);
        alert('An unexpected error occurred during validation.');
      } finally {
        this.isLoading = false;
        console.log('--- End of authentication process ---');
      }
    },

    // Check for empty fields
    validateInputs() {
      if (!this.currentUsername || !this.currentPassword) {
        alert('Please fill out all fields!');
        return false;
      }
      return true;
    },

    // Login
    async handleLogin() {
      const userStore = useUserStore();

      try {
        const response = await axios.post("http://localhost:5002/api/auth/login", {
          username: this.currentUsername,
          password: this.currentPassword,
        });

        // TESTING ONLY
        console.log(this.currentUsername, this.currentPassword);

        // If status 200 and response.data has user info (like username), consider it successful
        if (response.status === 200 && response.data && response.data.user && response.data.user.username) {
          const { username, is_admin } = response.data.user;
          alert("Login successful!");

          // TESTING ONLY
          // Save Username reference to Local Store - usually JWT
          userStore.setUser({ username: username, isAdmin: is_admin });

          this.$router.push("/home");
        } else {
          alert("Invalid username or password.");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          alert("Invalid username or password.");
        } else {
          alert("An unexpected error occurred.");
          console.error(error);
        }
      } finally {
        this.isLoading = false;
      }
    },

    // Register
    async handleRegister() {
      try {

        await axios.post("http://localhost:5002/api/auth/register", {
          username: this.currentUsername,
          password: this.currentPassword,
        });

        alert("Registration successful! Please log in.");
        this.toggleAuthMode(true);
      } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Registration failed.");
      } finally {
        this.isLoading = false;
      }
    },
  }
};
</script>

<style>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top: 4px solid #fa8e04;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
  margin: 20px auto;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.199);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  padding: 20px;
}

.title {
  text-align: center;
}

.login-tab {
  padding: 10px;
}

.input {
  margin-bottom: 15px;
}

.input label {
  display: block;
  font-size: 20px;
  margin: 0 0 5px 2px;
}

.input input {
  font-size: 16px;
  min-width: 200px;
  padding: 10px;
  border: 2px solid #1e1920;
  border-radius: 7px;
  background-color: #fff;
}

.button-title {
  font-size: 20px;
  text-align: center;
  margin: 0px;
}

.button-container {
  display: flex;
  flex-direction: column;
}

.button-field {
  display: flex;
  gap: 20px;
  padding: 10px 0 20px;
}

.button,
.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
}

.button {
  padding: 13px;
  min-width: 140px;
  border-radius: 25px;
  gap: 10px;
}

.button:hover {
  background-color: #686868;
  color: #fff;
  transform: scale(1.1);
}

.submit-button {
  padding: 8px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 1s ease-in-out, background-color 1s ease-in-out, width 1s ease-in-out;
  white-space: nowrap;
}

.submit-button:hover {
  width: auto;
  border-radius: 25px;
}

.submit-button .submit-text {
  display: none;
  padding: 5px;
  font-weight: bold;
  text-align: center;
}

.submit-button:hover .submit-text {
  display: inline;
}

.submit-button .arrow {
  width: 20px;
  height: 20px;
  background: url('@/assets/icons/Arrow_Right.png') no-repeat center/contain;
  transition: transform 1s ease-in-out;
}

.submit-button:hover .arrow {
  display: none;
}

.active {
  background-color: #fa8e04;
  color: #fff;
  font-weight: bold;
}
</style>
