
export const InvoiceView = ({id, nombre}) => {

    return (
        <>
            <ul className="list-group">
                <li className="list-group-item">Id: {id}</li>
                <li className="list-group-item">Name: {nombre}</li>
            </ul>
        </>
    )
}