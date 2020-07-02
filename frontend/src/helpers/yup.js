import * as _yup from 'yup';

_yup.addMethod(_yup.number, 'delocalize', function () {
  return this.transform(function (currentValue, originalValue) {
    return parseFloat(originalValue.replace(',', '.'));
  });
});
