<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Please {{ tab | titleCase }} your account
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input
        label="Email"
        class="col"
        outlined
        stack-label
        v-model="formData.email"
        :rules="[
          val =>
            isValidEmailAddress(val) || 'Please enter a valid email address'
        ]"
        lazy-rules
        ref="email"
      />
    </div>

    <div class="row q-mb-md">
      <q-input
        label="Password"
        type="password"
        class="col"
        outlined
        stack-label
        v-model="formData.password"
        :rules="[
          val => val.length >= 6 || 'Please enter at least 6 characters'
        ]"
        lazy-rules
        ref="password"
      />
    </div>

    <div class="row">
      <q-space />

      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (!this.$refs.email.hasError & !this.$refs.password.hasError) {
        // console.log("Register User");

        if (this.tab == "login") {
          console.log("loggin the user");
          this.loginUser(this.formData);
        } else {
          console.log("Registerr the user");
        }
      } else {
        console.log("Not Registering user at this stage");
      }
    },
    loginUser(formData) {
      console.log("Username:", this.formData.email);
      console.log(this.formData.password);

      // console.log(process.env.API)

      // let adTest = {
      //   email: this.formData.email,
      //   password: this.formData.password
      // }

      if (this.formData.email == "admin@admin.com") {
        console.log("admin@admin.com");
        this.$router.push("/admin");
      } else {
        this.$router.push("/client");
      }

      // console.log(loginFormData.email)
      // this.$axios.post(`${process.env.API}/loginUser`, adTest).then(response => {
      //   console.log('response : ', response)
      //   this.$q.notify({
      //       color: 'green-4',
      //       textColor: 'white',
      //       icon: 'cloud_done',
      //       message: 'Submitted Thank You!'
      //    })

      // }).catch(error => {
      //     console.log(error)
      //     this.$q.dialog({
      //       title: 'Error',
      //       message: 'Sorry, could not create post'
      //     })

      //   })
    },
    isValidEmailAddress(email) {
      // This validation routing was picked up on StackOverflow at the following link:- https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      // This author would like to thank and
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return re.test(String(email).toLowerCase());
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style></style>
