/**
 * Get Checkbox Option by List
 * @param list
 */
 export function getCheckboxOptions(list) {
    const options = [];
    if (list && list.length) {
      list.forEach((option) => {
        options.push(option.name);
      });
    }
  
    return options;
  }