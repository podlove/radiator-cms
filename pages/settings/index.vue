<template>
  <!-- USER SETTINGS PAGE  -->
  <!-- path: `/settings` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_settings-hero">
        <div
          :style="{
            backgroundImage: `url(${user.image ? user.image : ''})`
          }"
          class="r_settings-hero__cover has-background-light"
        ></div>
        <div class="container r_settings-hero__container">
          <h2 lass="subtitle is-size-6 r_settings-hero__subtitle">
            User Settings
          </h2>
          <h1 class="title is-size-3 r_settings-hero__title">
            {{ user.name }}
          </h1>
        </div>
      </div>
    </section>
    <section class="container r_settings__main">
      <b-field label="User">
        <b-input :value="user.name" disabled></b-input>
      </b-field>
      <b-field label="E-Mail">
        <b-input :value="user.email"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input :value="user.password" type="password"></b-input>
      </b-field>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: {
        name: 'Letty',
        email: 'example@mail.com',
        image: ''
      }
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn,
    username: state => state.auth.username
  })
}
</script>
<style>
.r_settings-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
}
.r_settings-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_settings-hero__cover {
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_settings-hero__subtitle {
  margin-bottom: 0.5rem !important;
}
.r_settings-hero__title {
  font-weight: 400;
  margin-bottom: 0.5rem !important;
}
</style>
