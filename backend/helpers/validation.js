const helperValidacion = {};

export const validation = async (data) => {
  const checkVacio = !Object.values(data).every((i) => i !== " ");
  return checkVacio;
};
