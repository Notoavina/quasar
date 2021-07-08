<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="
          bg-light-primary
          window-height window-width
          row
          justify-center
          items-center
        "
      >
        <div class="column">
          <div class="row">
            <q-card
              square
              bordered
              class="q-pa-lg shadow-1"
              style="background: transparent"
            >
              <q-card-section>
                <q-form
                  class="q-gutter-md"
                  method="post"
                  @submit.prevent="handleSubmit"
                >
                  <q-input
                    square
                    filled
                    color="white"
                    clearable
                    v-model="data.email"
                    type="email"
                    label="email"
                  />
                  <q-input
                    square
                    filled
                    color="white"
                    clearable
                    v-model="data.password"
                    type="password"
                    label="password"
                  />
                  <q-card-actions class="q-px-md">
                    <q-btn
                      unelevated
                      type="submit"
                      color="white"
                      size="lg"
                      class="full-width"
                      label="Login"
                      text-color="black"
                    />
                  </q-card-actions>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      data: { email: "", password: "" },
    };
  },
  methods: {
    async handleSubmit() {
      console.log(this.data);
      // await fetch('http://localhost:3000/api/register',
      // {
      //   method:'POST',
      //   headers: 'Content-Type : application/json',
      //   body: JSON.stringify(this.data)
      // })
      axios
        .post(
          "http://localhost:3000/api/register",
          {
            email: this.data.email,
            password: this.data.password,
          },
          {
            headers: "Content-Type : application/json",
            mode: "cors",
          }
        )
        .then((response) => {
          console.log(response);
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
