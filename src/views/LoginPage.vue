<template>
  <div class="login-container">

    <!-- Title -->
    <h1 class="title" v-html="titleText"></h1>

    <div class="login-tab">

      <!-- Authentication Form -->
      <form @submit.prevent="handleAuth" class="auth-form">
        <div class="input">
          <label :for="isUser ? 'username' : 'choose_username'">
            {{ isUser ? 'Username' : 'Your Username' }}
          </label>
          <input type="text" :id="isUser ? 'username' : 'choose_username'" v-model="currentUsername" required
            :placeholder="isUser ? 'Enter your username' : 'Choose your username'" />
        </div>
        <div class="input">
          <label :for="isUser ? 'password' : 'choose_password'">
            {{ isUser ? 'Password' : 'Your Password' }}
          </label>
          <input type="password" :id="isUser ? 'password' : 'choose_password'" v-model="currentPassword" required
            :placeholder="isUser ? 'Enter your password' : 'Choose your password'" />
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
      <button :class="{ 'active': isUser }" @click="toggleAuthMode(true)" type="button" class="button">Login</button>
      <button :class="{ 'active': !isUser }" @click="toggleAuthMode(false)" type="button"
        class="button">Register</button>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      isUser: true,
      username: "",
      password: "",
      choose_username: "",
      choose_password: "",
    };
  },
  computed: {
    titleText() {
      return this.isUser
        ? "Good To See You Again,<br>Please Login!"
        : "Welcome New User,<br>Please Enter Your Details!";
    },
    currentUsername: {
      get() {
        return this.isUser ? this.username : this.choose_username;
      },
      set(value) {
        if (this.isUser) {
          this.username = value;
        } else {
          this.choose_username = value;
        }
      }
    },
    currentPassword: {
      get() {
        return this.isUser ? this.password : this.choose_password;
      },
      set(value) {
        if (this.isUser) {
          this.password = value;
        } else {
          this.choose_password = value;
        }
      }
    }
  },
  methods: {
    toggleAuthMode(isLogin) {
      this.isUser = isLogin;
    },

    // Authentication Submit
    async handleAuth() {
      if (!this.isUser ? !this.choose_username || !this.choose_password : !this.username || !this.password) {
        alert("Please fill out all fields!");
        return;
      }

      try {
        const username = this.currentUsername;
        const password = this.currentPassword;

        // TODO: If necessary - transform now manual checks, on submit button, into automated execution on content changes

        // Model - Check username and password [SQLi, XSS]
        const usernameCheck = await this.checkSQLiXSS(username, password);
        if (usernameCheck === 'malicious') {
          alert("Malicious username or password detected!");
          return;
        }

        // Model - Check URL parameters [SLQi, XSS]
        const urlParamsCheck = await this.checkURLParams();
        if (urlParamsCheck === 'malicious') {
          alert("Suspicious URL parameters detected!");
          return;
        }

        // Model - Check dynamic content injection [SLQi, XSS]
        const dynamicContentCheck = await this.checkDynamicContent();
        if (dynamicContentCheck === 'malicious') {
          alert("Suspicious dynamic content detected!");
          return;
        }

        // Proceed with Login / Registration after all checks passed
        if (this.isUser) {
          await this.handleLogin();
        } else {
          await this.handleRegister();
        }

      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
      }
    },

    //Login
    async handleLogin() {
      const response = await axios.post("http://localhost:5002/login", {
        username: this.username,
        password: this.password,
      });

      if (response.data.message === "Login successful") {
        alert("Login successful!");
        this.$router.push("/home");
      } else {
        alert("Invalid username or password.");
      }
    },

    //Registering
    async handleRegister() {
      await axios.post("http://localhost:5002/register", {
        username: this.choose_username,
        password: this.choose_password,
      });
      alert("Registration successful! Please log in.");
      this.toggleAuthMode(true);
    },

    // Model check for SQLi and XSS attacks on username and password
    async checkSQLiXSS(username, password) {
      //TESTING, debug
      console.log("_____________start_____________");
      console.log("| Checking User Entered Content:");
      console.log("| Username:", username);
      console.log("| Password:", password);
      console.log("______________end______________");
      try {
        // Commented required behavior for payload data testing
        // const response = await axios.post("http://ml-server/check-sqli-xss", { username, password });
        // return response.data.status; // 'safe' or 'malicious'

        return 'safe'; // Simulated response
      } catch (error) {
        console.error("Error checking for Entered Content", error);
        return 'safe';
      }
    },

    // Model check for malicious URL parameters
    async checkURLParams() {
      const queryParams = this.$route.query;
      //TESTING, debug
      console.log("_____________start_____________");
      console.log("| Checking URL Parameters:");
      console.log("| ", queryParams);
      console.log("______________end______________");

      try {
        // Commented required behavior for payload data testing
        // const response = await axios.post("http://ml-server/check-url-params", queryParams);
        // return response.data.status; // 'safe' or 'malicious'

        return 'safe'; // Simulated response
      } catch (error) {
        console.error("Error checking URL Parameters:", error);
        return 'safe';
      }
    },

    // Model check for dynamic content injection
    async checkDynamicContent() {
      const dynamicContent = this.currentUsername + this.currentPassword;
      //TESTING, debug
      console.log("_____________start_____________");
      console.log("| Checking Dynamic Content:");
      console.log("| Credentials:", dynamicContent);
      console.log("______________end______________");

      try {
        // Commented required behavior for payload data testing
        // const response = await axios.post("http://ml-server/check-dynamic-content", { content: dynamicContent });
        // return response.data.status; // 'safe' or 'malicious'

        return 'safe'; // Simulated response
      } catch (error) {
        console.error("Error checking Dynamic Content:", error);
        return 'safe';
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
  min-width: 400px;
  padding: 30px 100px 30px 100px;
  border: 2px solid #1e1920;
  border-radius: 20px;
  background-color: rgba(165, 165, 165, 0.418);
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
  margin-bottom: 5px;
  margin-left: 2px;
}

.input input {
  font-size: 16px;
  min-width: 200px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border: 2px solid #1e1920;
  border-radius: 7px;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-top: 30px;
  padding-bottom: 20px;
}

.button {
  cursor: pointer;
  font-size: 16px;
  padding: 13px;
  min-width: 140px;
  border-radius: 25px;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  transition: transform 0.1s ease-in-out, background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.button:hover {
  background-color: #686868;
  color: rgb(255, 255, 255);
  transform: scale(1.1);
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  font-size: 16px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  transition: transform 1s ease-in-out, background-color 1s ease-in-out, width 1s ease-in-out;
  white-space: nowrap;
}

.submit-button .submit-text {
  text-align: center;
  font-weight: bold;
  display: none;
  padding: 5px;
}

.submit-button:hover {
  width: auto;
  border-radius: 25px;
}

.submit-button:hover .submit-text {
  display: inline;
}

.submit-button .arrow {
  width: 20px;
  height: 20px;
  background-image: url('@/assets/icons/right-arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform 1s ease-in-out;
}

.submit-button:hover .arrow {
  display: none;
}

.active {
  background-color: #fa8e04;
  color: white;
  font-weight: bold;
}
</style>
