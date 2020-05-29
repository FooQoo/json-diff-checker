import Vue from 'vue';
import { create, formatters } from 'jsondiffpatch';

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

Vue.prototype.$isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};
