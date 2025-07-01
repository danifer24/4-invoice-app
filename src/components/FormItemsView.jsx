import { useEffect, useState } from "react";

export const FormItemsView = ( {handler} ) => {

    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = formItemsState;

    useEffect(() => {
       // console.log('el precio cambio')
    }, [price]);
        
    useEffect(() => {
        // console.log('el formState cambio')
    }, [formItemsState]);

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

        handler(formItemsState);
        
        setFormItemsState({
            productValue: '',
            priceValue: '',
            quantityValue: '',
        });
    }

    return (<>
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
    </>)
}