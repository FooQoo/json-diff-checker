import Vue from 'vue';
import { create, formatters } from 'jsondiffpatch';
import '@mdi/font/css/materialdesignicons.css';

const diffpatcher = create({
  objectHash: function(obj: any) {
    return obj.name;
  }
});

Vue.prototype.$applyJsonDiff = (
  leftJson: string,
  rightJson: string
): { [key: string]: string } => {
  try {
    const left = JSON.parse(leftJson);
    const right = JSON.parse(rightJson);
    const leftDelta = diffpatcher.diff(left, right);
    const rightDelta = diffpatcher.diff(right, left);
    if (leftDelta && rightDelta) {
      return {
        left: formatters.html.format(leftDelta, left),
        right: formatters.html.format(rightDelta, right)
      };
    }
  } catch (e) {}

  return { left: '', right: '' };
};

const isValidJson = (json: string): boolean => {
  if (json === '') return false;
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};

Vue.prototype.$isValidJson = isValidJson;
