<template>
  <b-dropdown hoverable position="is-bottom-left" aria-role="list">
    <b-button
      slot="trigger"
      outlined
      inverted
      type="is-primary"
      icon-right="menu-down"
    >
      <span>Add new</span>
    </b-button>
    <b-dropdown-item aria-role="listitem">
      <nuxt-link to="/new-episode">
        <b-icon
          class="r_dropdown__icon"
          size="is-small"
          icon="microphone"
        ></b-icon>
        <span> New Episode</span>
      </nuxt-link>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem">
      <nuxt-link to="/networks/podcasts/new">
        <span
          class="has-background-primary r_dropdown__icon r_dropdown__podcast-cover"
        ></span>
        <span> New Podcast</span>
      </nuxt-link>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem">
      <nuxt-link to="/networks/new">
        <span
          class="has-background-primary r_dropdown__icon r_dropdown__network-cover"
        ></span>
        <span> New Network</span>
      </nuxt-link>
    </b-dropdown-item>
  </b-dropdown>
</template>

<style>
.r_dropdown__icon {
  display: inline-block;
  margin-right: 10px;
  vertical-align: text-bottom;
  width: 14px;
  height: 14px;
}
.r_dropdown__network-cover {
  border-radius: 50%;
}
.r_dropdown__podcast-cover {
  border-radius: 2px;
}
</style>
