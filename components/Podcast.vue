<template>
  <article class="r_podcast">
    <header class="r_podcast__header has-background-light">
      <div class="r_podcast__cover has-background-dark"></div>
      <div class="r_podcast__title">
        <h1 class="is-size-5">Logbuch:Netzpolitik</h1>
        <h2 class="is-size-7">
          Einblicke und Ausblicke in das netzpolitische Geschehen
        </h2>
      </div>
      <p class="r_podcast__analytics">
        <span class="is-size-4">38293</span>
        <span class="is-size-7">Subscriptions</span>
      </p>
    </header>
    <main class="r_podcast__main">
      <ul class="r_podcast__episodes">
        <li class="r_podcast__episodes__element">
          <a href="">
            <div class="r_podcast__episode-cover has-background-dark"></div>
          </a>
          <h3 class="r_podcast__episode-title">
            <a href="">LNP293 Versteckt hintenrum</a>
          </h3>
          <p class="r_podcast__episode-info">
            <span class="is-size-7">Downloads:</span>
            <span> 23943</span>
          </p>
          <p class="r_podcast__episode-info">
            <b-icon icon="check-circle" size="is-small"></b-icon>
            26.10.2019
          </p>
          <b-tooltip
            label="Open in episode page in new tab"
            class="r_podcast__episode-info"
            type="is-dark"
          >
            <button class="button">
              <b-icon icon="open-in-new"></b-icon>
            </button>
          </b-tooltip>
          <button class="button">
            <b-icon icon="dots-vertical"></b-icon>
          </button>
        </li>
        <li class="r_podcast__episodes__element">
          <a href="">
            <div class="r_podcast__episode-cover has-background-dark"></div>
          </a>
          <h3 class="r_podcast__episode-title">
            <a href="">LNP293 Versteckt hintenrum</a>
          </h3>
          <p class="r_podcast__episode-info">
            <span class="is-size-7">Downloads:</span>
            <span> 23943</span>
          </p>
          <p class="r_podcast__episode-info">
            <b-icon icon="check-circle" size="is-small"></b-icon>
            26.10.2019
          </p>
          <b-tooltip
            label="Open in episode page in new tab"
            class="r_podcast__episode-info"
            type="is-dark"
          >
            <button class="button">
              <b-icon icon="open-in-new"></b-icon>
            </button>
          </b-tooltip>
          <button class="button">
            <b-icon icon="dots-vertical"></b-icon>
          </button>
        </li>
      </ul>
    </main>
  </article>
</template>

<style>
.r_podcast {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_podcast__cover {
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  bottom: -20px;
  margin-right: 10px;
  width: 100px;
  height: 100px;
}
.r_podcast__episodes__element {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.r_podcast__episode-cover {
  border-radius: 2px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.r_podcast__episode-title {
  flex-grow: 1;
  margin-right: 20px;
}
.r_podcast__episode-info {
  margin-right: 20px;
}
.r_podcast__header {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.r_podcast__main {
  padding: 20px 20px;
}
.r_podcast__title {
  flex-grow: 1;
}
</style>
