import { getInvoice, calculateTotal } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { useEffect, useState } from 'react';

const initialInvoice = {
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
      id: 1,
      product: "Cpu Intel i7",
      price: 499,
      quantity: 1,
    },
    {
      id: 2,
      product: "Corsair Keyboard",
      price: 150,
      quantity: 2,
    },
    {
      id: 3,
      product: "Asus Monitor",
      price: 350,
      quantity: 1,
    },
  ],
};
export const InvoiceApp = () => {

    const [total, setTotal] = useState(0);

    const [invoice, setInvoice] = useState(initialInvoice);

    const [items, setItems] = useState([]);

    const [counter, setCounter] = useState(4);
    
    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });
    
    const { id, name, client, company } = invoice;

    const { product, price, quantity } = formItemsState;

    useEffect(() => {
        const data = getInvoice();
        console.log(data);
        setInvoice(data);
        setItems(data.items);
    }, []);

    useEffect(() => {
        // console.log('el precio cambio')
    }, [price]);
    
    useEffect(() => {
        // console.log('el formState cambio')
    }, [formItemsState]);

    useEffect(() => {
        // console.log('el counter cambio')
    }, [counter]);

    useEffect(() => {
        setTotal(calculateTotal(items));
    }, [items])
    
    const onInputChange = ({ target: { name, value } }) => {
        setFormItemsState({
            ...formItemsState,
            [name]: value
        });
    }

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if (product.trim().length < 1) {
            alert("Error, no se ha especificado un producto");
            return
        };
        if (price.trim().length < 1) {
            alert("Error, no se ha especificado un precio");
            return
        };
        if (isNaN(price.trim())) {
            alert("Error, el precio no es un número");
            return
        };
        if (quantity.trim().length < 1) {
            alert("Error, no se ha especificado una cantidad");
            return
        };
        if (isNaN(quantity.trim())) {
            alert("Error, la cantidad no es un número");
            return
        };

        setItems([...items, {
            id: counter,
            product: product.trim(),
            price: price.trim(),
            quantity: quantity.trim()
        }]);

        setFormItemsState({
            productValue: '',
            priceValue: '',
            quantityValue: '',
        })
        setCounter(counter + 1);
    }

    return (
        <>
            <div className="container">
                <div className="card my-3">

                    <div className="card-header">
                        Ejemplo factura
                    </div>

                    <div className="card-body">

                        <InvoiceView id={id} name={name} />

                        <div className="row my-3">

                            <div className="col">
                                <ClientView title={"Datos del cliente"} client={client} />
                            </div>

                            <div className="col">
                                <CompanyView title={"Datos de la empresa"} company={company} />
                            </div>
                        </div>

                        <ListItemsView title={"Productos de la factura"} items={items} />
                        <TotalView total={total} />
                        <form className="w-50" onSubmit={onInvoiceItemsSubmit}>
                            <input
                                type="text"
                                name="product"
                                value={product}
                                placeholder="Producto"
                                className="form-control m-2"
                                onChange={onInputChange} />
                            <input
                                type="text"
                                name="price"
                                value={price}
                                placeholder="Precio"
                                className="form-control m-2"
                                onChange={onInputChange} />
                            <input
                                type="text"
                                name="quantity"
                                value={quantity}
                                placeholder="Cantidad"
                                className="form-control m-2"
                                onChange={onInputChange} />
                            <button
                                type="submit"
                                className="btn btn-primary m-2"
                            >Nuevo Item</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}