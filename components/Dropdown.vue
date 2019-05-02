<template>
  <b-dropdown hoverable position="is-bottom-left" aria-role="list">
    <button slot="trigger" class="button">
      <span>Add new</span>
      <b-icon icon="menu-down"></b-icon>
    </button>
    <b-dropdown-item aria-role="listitem">
      <b-icon
        class="r_dropdown__icon"
        size="is-small"
        icon="microphone"
      ></b-icon>
      <span> New Episode</span>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem">
      <span
        class="has-background-dark r_dropdown__icon r_dropdown__podcast-cover"
      ></span>
      <span> New Podcast</span>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem">
      <span
        class="has-background-dark r_dropdown__icon r_dropdown__network-cover"
      ></span>
      <span> New Network</span>
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
