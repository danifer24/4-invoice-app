import { getInvoice } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { useState } from 'react';

export const InvoiceApp = () => {

    const { id, name, client, company, items: initialItems, total } = getInvoice();

    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = formItemsState;

    const [items, setItems] = useState(initialItems);

    const [counter, setCounter] = useState(4);

    const onInputChange = ({ target: { name, value } }) => {
        console.log(name);
        console.log(value);

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