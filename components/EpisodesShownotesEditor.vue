<template>
  <div class="editor">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-bold"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-italic"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-strikethrough"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-underline"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="code-tags"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-paragraph"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-header-1"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-header-2"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-header-3"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-list-bulleted"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-list-numbered"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="format-quote-open"
          ></b-icon>
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="code-not-equal-variant"
          ></b-icon>
        </button>
        <button class="menubar__button" @click="commands.horizontal_rule">
          <b-icon
            class="r_editor__icon"
            size="is-small"
            icon="border-horizontal"
          ></b-icon>
        </button>
        <button class="menubar__button" @click="commands.undo">
          <b-icon class="r_editor__icon" size="is-small" icon="undo"></b-icon>
        </button>
        <button class="menubar__button" @click="commands.redo">
          <b-icon class="r_editor__icon" size="is-small" icon="redo"></b-icon>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<style lang="scss">
.editor {
  position: relative;
  margin: 0 auto 2rem auto;
  &__content {
    background-color: #e9e9e9;
    min-height: 200px;
    word-wrap: break-word;
    div {
      outline: none;
      padding: 2rem;
    }
    * {
      caret-color: currentColor;
    }
    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: #000000;
      color: #ffffff;
      font-size: 0.8rem;
      overflow-x: auto;
      code {
        display: block;
      }
    }
    p code {
      display: inline-block;
      padding: 0 0.4rem;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      background: rgba(#000000, 0.1);
      color: rgba(#000000, 0.8);
    }
    ul,
    ol {
      padding-left: 1rem;
    }
    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }
    a {
      color: inherit;
    }
    blockquote {
      border-left: 3px solid rgba(#000000, 0.1);
      color: rgba(#000000, 0.8);
      padding-left: 0.8rem;
      font-style: italic;
      p {
        margin: 0;
      }
    }
    img {
      max-width: 100%;
      border-radius: 3px;
    }
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;
      td,
      th {
        min-width: 1em;
        border: 2px solid #dddddd;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }
      th {
        font-weight: bold;
        text-align: left;
      }
      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }
      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }
    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }
    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}
.menubar {
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }
  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }
  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: rgba(#000000, 0.05);
    }
    &.is-active {
      background-color: rgba(#000000, 0.1);
    }
  }
  span#{&}__button {
    font-size: 13.3333px;
  }
}
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

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorMenuBar,
    EditorContent
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: `
          <p>
            Hello 👋, you can write your <b>show notes</b> using <em>markdown</em> syntax here.
          </p>
        `
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
