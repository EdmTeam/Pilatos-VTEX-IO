import  { endsWith } from "ramda"

export const serializer = (documents:any) => {
  if (!documents) return [];
  const filedReducer = (acumulator:any, field:any) => {
    if (!endsWith("__typename", field.key)) {
      acumulator[field.key] = field.value;
    }
    if (endsWith("__typename", field.key)) {
      acumulator[field.key] = JSON.parse(field.value);
    }
    return acumulator;
  };
  const documentReducer = (acumulador:any, documents:any) => {
    if (!documents || !documents.fields) {
      return acumulador;
    }
    acumulador.push(documents.fields.reduce(filedReducer, {}));
    return acumulador;
  };
  return documents.reduce(documentReducer, []);
};
