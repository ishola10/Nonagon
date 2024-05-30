<template>
  <div class="log">
    <router-link to="/" class="link">← Back Home</router-link>
    <div class="temp">
      <div class="login">
        <h2>
          Welcome to <strong style="color: #bc6c25">Predictify!!</strong>, let's
          get started
        </h2>
        <h3>Login</h3>
        <form @submit.prevent="login">
          <label for="email">Email:</label>
          <input v-model="email" type="email" required />
          <label for="password">Password:</label>
          <div class="password-container">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
            />
            <input
              @click="togglePasswordVisibility"
              type="checkbox"
              name=""
              id=""
            />
          </div>
          <button
            type="submit"
            :disabled="loading"
            style="background-color: #bc6c25"
          >
            {{ loading ? "Logging in..." : "Login" }}
          </button>
        </form>
        <br />
        <button @click="signInWithGoogle" class="google-signin">
          Login with Google
        </button>
        <br />
        <div>
          <router-link class="signup-link" to="/signup">
            Don't have an account? Sign up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import router from "@/router/index";

const email = ref("");
const password = ref("");
const loading = ref(false);
const showPassword = ref(false);

const login = async () => {
  loading.value = true;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/profile");
  } catch (error) {
    console.error("Error logging in:", error.message);
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        dob: "",
        address: "",
        phone: "",
      });
    }

    router.push("/profile");
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
  }
};
</script>

<style scoped>
.log {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fefae0;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.temp {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fefae0;
}

.link {
  display: block;
  color: #bc6c25;
  text-decoration: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.login {
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fefae0;
  color: #283618;
  border: 1px solid #dda15e;
}

.login h3 {
  margin-bottom: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #bc6c25;
}

.login label {
  text-align: left;
  display: block;
  color: #283618;
}

.login input {
  width: 90%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #bc6c25;
  outline: none;
  background-color: #fefae0;
  color: #283618;
}

.login button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #bc6c25;
  color: #fefae0;
}

.login button:hover {
  background-color: #283618;
}

.login button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.signup-link {
  text-align: center;
  margin-top: 10px;
  color: #283618;
  text-decoration: underline;
}

.password-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #bc6c25;
  border-radius: 5px;
  margin-bottom: 10px;
  height: 36px;
  width: 95%;
}

.password-container input[type="password"],
.password-container input[type="text"] {
  border: 1px solid #bc6c25;
  padding: 10px;
  background-color: #fefae0;
  margin-top: 2.7%;
  width: 690%;
}

.password-container input[type="checkbox"] {
  margin: 3px 0;
}

.google-login {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #bc6c25;
  cursor: pointer;
  background-color: white;
  color: #bc6c25;
  font-size: 16px;
  text-align: center;
  display: block;
}

.google-login:hover {
  background-color: #f1f1f1;
}
</style>
