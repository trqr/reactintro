type CardTitleProps = {
    title: string;
}

const CardTitle = ({title}: CardTitleProps) => {
    return (
        <>
            <div className={"product-card-title"}>{title}</div>
        </>
    )
}

export default CardTitle;