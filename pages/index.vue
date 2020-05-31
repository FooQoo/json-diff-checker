<template>
  <v-layout column justify-center align-center>
    <v-flex xs24 sm16 md12 style="width: 100%;">
      <v-row no-gutters>
        <v-col class="mx-4 my-12">
          <v-card class="px-10">
            <v-textarea
              v-model="leftJson"
              rows="10"
              @keydown.prevent.tab.exact="addTab($event, 'leftArea')"
              @keydown.prevent.enter.exact="addIndentEnter($event, 'leftArea')"
            />
          </v-card>
        </v-col>
        <v-col class="mx-4 my-12">
          <v-card class="px-10">
            <v-textarea
              v-model="rightJson"
              rows="10"
              @keydown.prevent.tab.exact="addTab($event, 'rightArea')"
              @keydown.prevent.enter.exact="addIndentEnter($event, 'rightArea')"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <div class="btn-block">
            <v-btn v-on:click="resetJson" max-width="100" min-width="100">Reset</v-btn>
          </div>
        </v-col>
        <v-col>
          <div class="btn-block">
            <v-btn v-on:click="compareJson" max-width="100" min-width="100">Compare</v-btn>
          </div>
        </v-col>
        <v-col>
          <div class="btn-block">
            <v-btn
              v-on:click="toggleCompareMode"
              max-width="100"
              min-width="100"
            >{{ leftMode ? 'Left diff' : 'Right diff' }}</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters v-if="showDifference">
        <v-col class="mx-4 my-12">
          <v-card>
            <v-card-title class="headline">Difference</v-card-title>
            <v-card-text v-html="$store.state.diff.left" />
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="showValid">
        <v-col class="mx-4 my-12">
          <v-alert type="warning" icon="mdi-alert">Invalid json format.</v-alert>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
const LEFT_JSON_DEFAULT =
  '{\n\t"name": "Tanaka Taro",\n\t"gender": "male",\n\t"children": [\n\t\t"Hanako",\n\t\t"Takashi"\n\t]\n}';
const RIGHT_JSON_DEFAULT =
  '{\n\t"name": "Tanaka Kyoko",\n\t"gender": "female",\n\t"children": [\n\t\t"Fujiko"\n\t]\n}';

export default {
  data: () => {
    return {
      leftJson: LEFT_JSON_DEFAULT,
      rightJson: RIGHT_JSON_DEFAULT,
      showDifference: false,
      showValid: false,
      leftMode: true
    };
  },
  methods: {
    toggleCompareMode: function() {
      this.leftMode = !this.leftMode;
    },
    compareJson: function(event) {
      if (
        this.$isValidJson(this.leftJson) &&
        this.$isValidJson(this.rightJson)
      ) {
        const leftJson = this.leftMode ? this.leftJson : this.rightJson;
        const rightJson = this.leftMode ? this.rightJson : this.leftJson;
        const diff = this.$applyJsonDiff(
          this.removeSpace(leftJson),
          this.removeSpace(rightJson)
        );
        this.$store.commit('setDiff', diff);
        this.showDifference = true;
        this.showValid = false;
      } else {
        this.showDifference = false;
        this.showValid = true;
      }
    },
    resetJson: function(event) {
      this.leftJson = '';
      this.rightJson = '';
      this.$store.commit('setDiff', { left: '', right: '' });
      this.showDifference = false;
      this.showValid = false;
    },
    addTab: function(event, area) {
      if (event) {
        const text =
          area === 'leftArea'
            ? this.leftJson
            : area === 'rightArea'
            ? this.rightJson
            : '';
        const originalSelectionStart = event.target.selectionStart;
        const startText = text.slice(0, originalSelectionStart);
        const endText = text.slice(originalSelectionStart);
        const tabAddedText = `${startText}\t${endText}`;
        if (area === 'leftArea') {
          this.leftJson = tabAddedText;
          event.target.value = this.leftJson;
        } else if (area === 'rightArea') {
          this.rightJson = tabAddedText;
          event.target.value = this.rightJson;
        }

        event.target.selectionEnd = event.target.selectionStart =
          originalSelectionStart + 1;
      }
    },
    addIndentEnter: function(event, area) {
      if (event) {
        const text =
          area === 'leftArea'
            ? this.leftJson
            : area === 'rightArea'
            ? this.rightJson
            : '';
        const originalSelectionStart = event.target.selectionStart;
        const startText = text.slice(0, originalSelectionStart);
        const numTabBeforeLine =
          startText
            .split('\n')
            .slice(-1)[0]
            .split('\t').length - 1;
        const endText = text.slice(originalSelectionStart);
        const tabAddedText = `${startText}\n${'\t'.repeat(
          numTabBeforeLine
        )}${endText}`;
        if (area === 'leftArea') {
          this.leftJson = tabAddedText;
          event.target.value = this.leftJson;
        } else if (area === 'rightArea') {
          this.rightJson = tabAddedText;
          event.target.value = this.rightJson;
        }

        event.target.selectionEnd = event.target.selectionStart =
          originalSelectionStart + 1 + numTabBeforeLine;
      }
    },
    removeSpace: function(json) {
      return json.replace(/\r?\n/g, '').replace(/\t/g, '');
    }
  }
};
</script>

<style lang="scss">
.btn-block {
  text-align: center;
}
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
</style>
