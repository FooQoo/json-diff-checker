import Vue from 'vue';

Vue.prototype.$detectDifference = (
  leftJson: string,
  rightJson: string
): { [key: string]: number } => {
  try {
    const left: { [key: string]: string } = JSON.parse(leftJson);
    const right: { [key: string]: string } = JSON.parse(rightJson);
    const keys: string[] = Array.from(
      new Set(Object.keys(left).concat(Object.keys(right)))
    );

    return keys
      .map((key: string) => {
        if (left[key] === right[key]) {
          return { [key]: 1 };
        } else if (!left[key]) {
          return { [key]: 2 };
        } else if (!right[key]) {
          return { [key]: 3 };
        } else {
          return { [key]: 0 };
        }
      })
      .reduce((l, r) => Object.assign(l, r), {});
  } catch (e) {
    return {};
  }
};

Vue.prototype.$isValidJson = (json: string): boolean => {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
};
