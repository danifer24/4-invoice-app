import { getInvoice } from "../services/getInvoice";
import { ClientView } from "./ClientView";
import { CompanyView } from "./CompanyView";
import { InvoiceView } from "./InvoiceView";
import { ListItemsView } from "./ListItemsView";

export const InvoiceApp = () => {

    const { id, name, client, company, items } = getInvoice();

    return (
        <>
            <div className="container">
                <div className="card my-3">

                    <div className="card-header">
                        Ejemplo factura
                    </div>

                    <div className="card-body">

                        <InvoiceView id={id} name={name}/>

                        <div className="row my-3">

                            <div className="col">
                                <ClientView title={"Datos del cliente"} client={client}/>
                            </div>

                            <div className="col">
                                <CompanyView title={"Datos de la empresa"} company={company}/>
                            </div>
                        </div>

                        <ListItemsView title={"Productos de la factura"} items={items}/>

                    </div>
                </div>
            </div>
        </>
    )
}