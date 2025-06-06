type CardPriceProps = {
    price: number;
}

const CardPrice = ({price}: CardPriceProps) => {
    return (
        <>
            <div className={"product-card-price"}>{price.toFixed(2)} €</div>
        </>
    )
}

export default CardPrice;