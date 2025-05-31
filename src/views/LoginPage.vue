<template>
  <div class="login-container">

    <!-- Title -->
    <h1 class="title" v-html="titleText"></h1>
    <div class="login-tab">

      <!-- Authentication Form -->
      <form @submit.prevent="handleAuth" class="auth-form">
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

        <!-- Submit Input Button -->
        <button type="submit" class="submit-button">
          <span class="arrow"></span>
          <span class="submit-text">Proceed</span>
        </button>
      </form>
    </div>

    <!-- Authentication Switch -->
    <div class="button-container">
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
      isLoginMode: true,
      username: "",
      password: "",
      choose_username: "",
      choose_password: "",
    };
  },
  computed: {
    titleText() {
      return this.isLoginMode
        ? "Good To See You Again,<br>Please Login!"
        : "Welcome New User,<br>Please Enter Your Details!";
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

    // EXTRACT HANDLE AUTH IN FRONTEND UTILS
    // Authentication Submit
    async handleAuth() {
      const username = this.currentUsername;
      const password = this.currentPassword;

      if (!username || !password) {
        alert("Please fill out all fields!");
        return;
      }

      // REMOVE LINE WHEN checkDynamicContent IS ACTIVE
      this.isLoginMode ? await this.handleLogin() : await this.handleRegister();



      // SARRAA Check Block, Manually Executed on handleAuth call (Proceed Button Press)
      // ML Classification using FastAPI hosted on endpoint http://127.0.0.1:8001
      /*
      try {
        const prediction = await checkDynamicContent(username);

        if (prediction === "malicious") {
          alert("Security Warning: Malicious username detected.");
          return;
        }

        this.isLoginMode ? await this.handleLogin() : await this.handleRegister();

      } catch (error) {
        console.error("Security check failed:", error);
        alert("An unexpected error occurred during validation.");
      }
        */
    },


    //Login
    async handleLogin() {
      const userStore = useUserStore();

      try {
        const response = await axios.post("http://localhost:5002/api/login", {
          username: this.username,
          password: this.password,
        });

        // If status 200 and response.data has user info (like username), consider it successful
        if (response.status === 200 && response.data && response.data.username) {
          alert("Login successful!");

          // TESTING ONLY
          // Save credentials in global Pinia store
          userStore.setCredentials(this.username, this.password)

          this.$router.push("/home");
        } else {
          alert("Invalid username or password.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Invalid username or password.");
        } else {
          alert("An unexpected error occurred.");
          console.error(error);
        }
      }
    },

    //Registering
    async handleRegister() {
      try {

        // Plain Register
        await axios.post("http://localhost:5002/api/registerplain", {
          username: this.choose_username,
          password: this.choose_password,
        });

        // Hashed Register
        // await axios.post("http://localhost:5002/api/registerhashed", {
        //   username: this.choose_username,
        //   password: this.choose_password,
        // });

        alert("Registration successful! Please log in.");
        this.toggleAuthMode(true);
      } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Registration failed.");
      }
    },
  }
};
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  padding: 30px;
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

.button-container {
  display: flex;
  gap: 20px;
  padding: 30px 0 20px;
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
