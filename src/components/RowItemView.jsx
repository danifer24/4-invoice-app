
export const RowItemView = ({ id, product, price, quantity, handlerDeleteItem }) => {

    return (
        <>
            <tr>
                <td> {product} </td>
                <td> {price} </td>
                <td> {quantity} </td>
                <td> <button className="btn btn-danger"
                onClick={() => handlerDeleteItem(id) }> eliminar </button></td>
            </tr>
        </>
    )
}