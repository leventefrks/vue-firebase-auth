<template>
  <div class="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto shadow-2xl">
    <div class="py-8 px-8 rounded-xl">
      <h1 class="font-medium text-2xl mt-3 text-center">Register</h1>
      <form @submit.prevent="register" class="mt-6">
        <div class="my-5 text-sm">
          <label for="email" class="block text-black">Email</label>
          <input
            type="text"
            v-model="form.email"
            @blur="$v.form.email.$touch"
            autofocus
            id="email"
            class="rounded-sm px-4 py-3 mt-3 bg-gray-100 w-full"
            placeholder="Email"
            :class="{ 'border-1 border-red-500': $v.form.email.$error }"
          />
          <div
            v-if="!$v.form.email.required && $v.form.email.$error"
            class="text-red-500"
          >
            The email field is required
          </div>
          <div
            v-else-if="!$v.form.email.email && $v.form.email.$error"
            class="text-red-500"
          >
            The email field is invalid
          </div>
        </div>
        <div class="my-5 text-sm">
          <label for="password" class="block text-black">Password</label>
          <input
            type="password"
            v-model="form.password"
            @blur="$v.form.password.$touch"
            id="password"
            class="rounded-sm px-4 py-3 mt-3 bg-gray-100 w-full border-gray"
            placeholder="Password"
            :class="{ 'border-1 border-red-500': $v.form.password.$error }"
          />
          <div v-if="$v.form.password.$required" class="text-red-500">
            The password field is required
          </div>
          <div v-else-if="!$v.form.password.minLength" class="text-red-500">
            The password field should have 3 characters
          </div>
        </div>
        <div class="my-5 text-sm">
          <label for="secondary-password" class="block text-black"
            >Confirm Password</label
          >
          <input
            type="password"
            v-model="form.secondaryPassword"
            @blur="$v.form.secondaryPassword.$touch"
            id="secondary-password"
            class="rounded-sm px-4 py-3 mt-3 bg-gray-100 w-full"
            placeholder="Password"
            :class="{
              'border-1 border-red-500': $v.form.secondaryPassword.$error,
            }"
          />
          <div v-if="$v.form.secondaryPassword.$error" class="text-red-500">
            The confirm password should be the same as the password
          </div>
        </div>
        <button
          class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
        >
          Register now
        </button>
      </form>
      <div class="pt-6 text-xs text-center font-light text-gray-400">
        Have an account? <router-link
          to="/"
          class="text-black hover:text-gray-700 font-medium underline"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import firebase from "firebase";

export default {
  name: "Register",

  validations: {
    form: {
      email: {
        required,
        email,
      },

      password: {
        required,
        minLength: minLength(3),
      },

      secondaryPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },

  data() {
    return {
      form: {
        email: null,
        password: null,
        secondaryPassword: null,
      },
    };
  },

  methods: {
    register() {
      this.onTouchForm();
      if (!this.$v.form.$error) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password);
      }
    },

    onTouchForm() {
      this.$v.form.$touch();
    },
  },
};
</script>
