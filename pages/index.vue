<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Left Difference
        </v-card-title>
        <v-card-text v-html="$store.state.diff.left" />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Right Difference
        </v-card-title>
        <v-card-text v-html="$store.state.diff.right" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  mounted() {
    const diff = this.$applyJsonDiff(
      '{"name": "Jon", "sex": "male", "desc": "hoge", "list": [{"entity": 1}]}',
      '{"name": "Jon", "sex": "female", "role": "king", "list": [{"entity": 2}]}'
    );
    this.$store.commit('setDiff', diff);
    console.log(this.$store.state.diff.left);
    console.log(this.$store.state.diff.right);
  }
};
</script>

<style>
.jsondiffpatch-delta {
  font-family: 'Bitstream Vera Sans Mono', 'DejaVu Sans Mono', Monaco, Courier,
    monospace;
  font-size: 12px;
  margin: 0;
  padding: 0 0 0 12px;
  display: inline-block;
}
.jsondiffpatch-delta pre {
  font-family: 'Bitstream Vera Sans Mono', 'DejaVu Sans Mono', Monaco, Courier,
    monospace;
  font-size: 12px;
  margin: 0;
  padding: 0;
  display: inline-block;
}
ul.jsondiffpatch-delta {
  list-style-type: none;
  padding: 0 0 0 20px;
  margin: 0;
}
.jsondiffpatch-delta ul {
  list-style-type: none;
  padding: 0 0 0 20px;
  margin: 0;
}
.jsondiffpatch-added .jsondiffpatch-property-name,
.jsondiffpatch-added .jsondiffpatch-value pre,
.jsondiffpatch-modified .jsondiffpatch-right-value pre,
.jsondiffpatch-textdiff-added {
  background: #bbffbb;
}
.jsondiffpatch-deleted .jsondiffpatch-property-name,
.jsondiffpatch-deleted pre,
.jsondiffpatch-modified .jsondiffpatch-left-value pre,
.jsondiffpatch-textdiff-deleted {
  background: #ffbbbb;
  text-decoration: line-through;
}
.jsondiffpatch-unchanged,
.jsondiffpatch-movedestination {
  color: gray;
}
.jsondiffpatch-unchanged,
.jsondiffpatch-movedestination > .jsondiffpatch-value {
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  overflow-y: hidden;
}
.jsondiffpatch-unchanged-showing .jsondiffpatch-unchanged,
.jsondiffpatch-unchanged-showing
  .jsondiffpatch-movedestination
  > .jsondiffpatch-value {
  max-height: 100px;
}
.jsondiffpatch-unchanged-hidden .jsondiffpatch-unchanged,
.jsondiffpatch-unchanged-hidden
  .jsondiffpatch-movedestination
  > .jsondiffpatch-value {
  max-height: 0;
}
.jsondiffpatch-unchanged-hiding
  .jsondiffpatch-movedestination
  > .jsondiffpatch-value,
.jsondiffpatch-unchanged-hidden
  .jsondiffpatch-movedestination
  > .jsondiffpatch-value {
  display: block;
}
.jsondiffpatch-unchanged-visible .jsondiffpatch-unchanged,
.jsondiffpatch-unchanged-visible
  .jsondiffpatch-movedestination
  > .jsondiffpatch-value {
  max-height: 100px;
}
.jsondiffpatch-unchanged-hiding .jsondiffpatch-unchanged,
.jsondiffpatch-unchanged-hiding
  .jsondiffpatch-movedestination
  > .jsondiffpatch-value {
  max-height: 0;
}
.jsondiffpatch-unchanged-showing .jsondiffpatch-arrow,
.jsondiffpatch-unchanged-hiding .jsondiffpatch-arrow {
  display: none;
}
.jsondiffpatch-value {
  display: inline-block;
}
.jsondiffpatch-property-name {
  display: inline-block;
  padding-right: 5px;
  vertical-align: top;
}
.jsondiffpatch-property-name:after {
  content: ': ';
}
.jsondiffpatch-child-node-type-array > .jsondiffpatch-property-name:after {
  content: ': [';
}
.jsondiffpatch-child-node-type-array:after {
  content: '],';
}
div.jsondiffpatch-child-node-type-array:before {
  content: '[';
}
div.jsondiffpatch-child-node-type-array:after {
  content: ']';
}
.jsondiffpatch-child-node-type-object > .jsondiffpatch-property-name:after {
  content: ': {';
}
.jsondiffpatch-child-node-type-object:after {
  content: '},';
}
div.jsondiffpatch-child-node-type-object:before {
  content: '{';
}
div.jsondiffpatch-child-node-type-object:after {
  content: '}';
}
.jsondiffpatch-value pre:after {
  content: ',';
}
li:last-child > .jsondiffpatch-value pre:after,
.jsondiffpatch-modified > .jsondiffpatch-left-value pre:after {
  content: '';
}
.jsondiffpatch-modified .jsondiffpatch-value {
  display: inline-block;
}
.jsondiffpatch-modified .jsondiffpatch-right-value {
  margin-left: 5px;
}
.jsondiffpatch-moved .jsondiffpatch-value {
  display: none;
}
.jsondiffpatch-moved .jsondiffpatch-moved-destination {
  display: inline-block;
  background: #ffffbb;
  color: #888;
}
.jsondiffpatch-moved .jsondiffpatch-moved-destination:before {
  content: ' => ';
}
ul.jsondiffpatch-textdiff {
  padding: 0;
}
.jsondiffpatch-textdiff-location {
  color: #bbb;
  display: inline-block;
  min-width: 60px;
}
.jsondiffpatch-textdiff-line {
  display: inline-block;
}
.jsondiffpatch-textdiff-line-number:after {
  content: ',';
}
.jsondiffpatch-error {
  background: red;
  color: white;
  font-weight: bold;
}

.jsondiffpatch-visualdiff-root {
  font-family: 'Bitstream Vera Sans Mono', 'DejaVu Sans Mono', Monaco, Courier,
    monospace;
  font-size: 0.8em;
  margin: 20px;
}

.jsondiffpatch-unchanged {
  color: gray;
}

.jsondiffpatch-added span,
.jsondiffpatch-added p {
  background: #bbffbb;
}

.jsondiffpatch-deleted span,
.jsondiffpatch-deleted p {
  background: #ffbbbb;
  text-decoration: line-through;
}

.jsondiffpatch-deleted span:hover {
  text-decoration: none;
}

.jsondiffpatch-deleted p:hover {
  text-decoration: none;
}

.jsondiffpatch-textdiff .jsondiffpatch-added {
  background: #bbffbb;
}

.jsondiffpatch-textdiff .jsondiffpatch-deleted {
  background: #ffbbbb;
  text-decoration: line-through;
}

.jsondiffpatch-textdiff .jsondiffpatch-deleted:hover {
  text-decoration: none;
}

.jsondiffpatch-textdiff .jsondiffpatch-header {
  color: gray;
  display: block;
}

.jsondiffpatch-modified-original {
  background: #ffbbbb;
}

.jsondiffpatch-modified-original > div > p {
  text-decoration: line-through;
}

.jsondiffpatch-modified-original > div > p:hover {
  text-decoration: none;
}

.jsondiffpatch-modified-new {
  margin-left: 5px;
  background: #bbffbb;
}

.jsondiffpatch-visualdiff-root p {
  margin: 0;
  padding: 0;
  display: inline-block;
  vertical-align: top;
  min-height: 17px;
}

.jsondiffpatch-property-name {
  margin: 0;
  padding: 0 10px 0 0;
  display: inline-block;
  min-height: 17px;
  font-style: italic;
}

.jsondiffpatch-visualdiff-root ul {
  padding-left: 20px;
  border-left: 1px dotted gray;
}

.jsondiffpatch-modified-original,
.jsondiffpatch-modified-new {
  float: left;
}
</style>
