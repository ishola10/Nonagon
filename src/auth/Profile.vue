<template>
  <div class="profile">
    <h2>Profile</h2>
    <div v-if="user">
      <div class="user-info">
        <div class="profile-picture">
          <img
            :src="user.photoURL || '../assets/default-profile-picture.png'"
            :alt="user.displayName"
          />
          <input type="file" accept="image/*" @change="uploadProfilePicture" />
        </div>
        <div class="user-details">
          <div v-if="editing">
            <label for="newName">New Name:</label>
            <input v-model="newName" type="text" required />
            <label for="dob">Date of Birth:</label>
            <input v-model="dob" type="date" required />
            <label for="address">Address:</label>
            <input v-model="address" type="text" required />
            <label for="phone">Phone Number:</label>
            <input v-model="phone" type="tel" required />
            <button @click="saveProfile">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
          <div v-else>
            <p><strong>Name:</strong> {{ user.displayName }}</p>
            <p><strong>Date of Birth:</strong> {{ user.dob }}</p>
            <p><strong>Address:</strong> {{ user.address }}</p>
            <p><strong>Phone Number:</strong> {{ user.phone }}</p>
            <button @click="startEdit">Edit Profile</button>
          </div>
          <button @click="signout">Sign out</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>User not logged in</p>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth, storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import router from "@/router/index";

const user = ref(null);
const editing = ref(false);
const newName = ref("");
const dob = ref("");
const address = ref("");
const phone = ref("");

onMounted(() => {
  const unsubscribe = auth.onAuthStateChanged((newUser) => {
    user.value = newUser;
    if (newUser) {
      newName.value = newUser.displayName || "";
      dob.value = newUser.dob || "";
      address.value = newUser.address || "";
      phone.value = newUser.phone || "";
    }
  });

  return () => {
    unsubscribe();
  };
});

const signout = async () => {
  try {
    await auth.signOut();
    console.log("User signed out");
    router.push("/login");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

const startEdit = () => {
  editing.value = true;
};

const cancelEdit = () => {
  editing.value = false;
};

const saveProfile = async () => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: newName.value,
      dob: dob.value,
      address: address.value,
      phone: phone.value,
    });
    user.value.displayName = newName.value;
    user.value.dob = dob.value;
    user.value.address = address.value;
    user.value.phone = phone.value;
    editing.value = false;
  } catch (error) {
    console.error("Error saving profile:", error.message);
  }
};

const uploadProfilePicture = async (event) => {
  const file = event.target.files[0];
  const storageReference = storageRef(
    storage,
    `profilePictures/${auth.currentUser.uid}/${file.name}`
  );

  try {
    const snapshot = await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    user.value.photoURL = downloadURL;

    await updateProfile(auth.currentUser, {
      photoURL: downloadURL,
    });

    console.log("Profile picture uploaded successfully.");
  } catch (error) {
    console.error("Error uploading profile picture:", error.message);
  }
};
</script>

<style>
.profile {
  max-width: 300px;
  margin: 0 auto;
  margin-top: 10%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  width: 100px;
  height: 150px;
  /* border-radius: 50%; */
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid black;
  padding: 25px;
  border-radius: 100%;
  margin-bottom: 20px;
}

.default-picture {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-details {
  width: 100%;
}

.user-details input {
  width: calc(100% - 20px);
  margin-bottom: 10px;
}

.user-details button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.user-details button:hover {
  background-color: darkblue;
}

.user-details button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}

.user-details p {
  margin-bottom: 10px;
}

.user-details strong {
  font-weight: bold;
}

.user-details button + button {
  margin-left: 0;
}
</style>