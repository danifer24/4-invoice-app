export const invoice = {
  id: 10,
  nombre: "Componentes PC",
  client: {
    name: "Dani",
    lastname: "Fernández",
    address: {
      country: "Spain",
      city: "Arriondas",
      street: "Callejuela",
      number: 15,
    },
  },
  company: {
    name: "CSWA",
    fiscalNumber: 1234567,
  },
  items: [
    {
      product: "Cpu Intel i7",
      price: 499,
      quantity: 1,
    },
    {
      product: "Corsair Keyboard",
      price: 150,
      quantity: 1,
    },
    {
      product: "Asus Monitor",
      price: 350,
      quantity: 1,
    },
  ],
};
