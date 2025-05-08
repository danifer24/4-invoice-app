import { getInvoice } from "./services/getInvoice";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { useState } from 'react';

export const InvoiceApp = () => {

    const { id, name, client, company, items: initialItems, total } = getInvoice();

    const [productValue, setProductValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');

    const [items, setItems] = useState(initialItems);

    const [counter, setCounter] = useState(4);

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
                        <form className="w-50" onSubmit={event => {
                            event.preventDefault();

                            if(productValue.trim().length < 1) {
                                alert("Error, no se ha especificado un producto");
                                return};
                            if(priceValue.trim().length < 1) {
                                alert("Error, no se ha especificado un precio");
                                return};
                            if(isNaN(priceValue.trim())) {
                                alert("Error, el precio no es un número");
                                return};
                            if(quantityValue.trim().length < 1) {
                                alert("Error, no se ha especificado una cantidad");
                                return};
                            if(isNaN(quantityValue.trim())) {
                                alert("Error, la cantidad no es un número");
                                return};

                            setItems([...items, {
                                id: counter,
                                product: productValue.trim(),
                                price: priceValue.trim(),
                                quantity: quantityValue.trim()
                            }]);
                            setProductValue('');
                            setPriceValue('');
                            setQuantityValue('');
                            setCounter(counter + 1);
                        }}>
                            <input
                                type="text"
                                name="product"
                                value={productValue}
                                placeholder="Producto"
                                className="form-control m-2"
                                onChange={event => {
                                    console.log(event.target.value);
                                    setProductValue(event.target.value);
                                }} />
                            <input
                                type="text"
                                name="price"
                                value={priceValue}
                                placeholder="Precio"
                                className="form-control m-2"
                                onChange={event => {
                                    console.log(event.target.value);
                                    setPriceValue(event.target.value);
                                }} />
                            <input
                                type="text"
                                name="quantity"
                                value={quantityValue}
                                placeholder="Cantidad"
                                className="form-control m-2"
                                onChange={event => {
                                    console.log(event.target.value);
                                    setQuantityValue(event.target.value);
                                }} />
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