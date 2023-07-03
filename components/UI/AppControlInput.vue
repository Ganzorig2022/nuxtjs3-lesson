<template>
  <div class="input-control">
    <label><slot /></label>
    <input v-if="controlType === 'input'" :value="value" @input="onInput" />
    <textarea
      v-if="controlType === 'textarea'"
      rows="10"
      :value="value"
      @input="onInput"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "AppInputControl",
  emits: ["update:value"],
  props: {
    controlType: {
      type: String,
      default: "input",
    },
    value: {
      type: String,
      default: "",
    },
  },

  methods: {
    onInput(event) {
      this.$emit("update:value", event.target.value);
    },
  },
};
</script>

<style scoped>
.input-control {
  margin: 10px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}
</style>


