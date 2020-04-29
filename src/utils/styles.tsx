import cssVariables from './../assets/scss/_css_variables.scss';

export { cssVariables };

export const getMainColor = () => {
  let { main: mainColor } = cssVariables;
  mainColor = mainColor ?? '#0295f3';
  return mainColor;
};
