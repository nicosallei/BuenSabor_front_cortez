export const MostrarTodasLasCategorias = () => {
  fetch("/traer-todo/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
