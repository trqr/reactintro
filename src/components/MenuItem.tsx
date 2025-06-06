import '../styles/MenuItem.css'

type MenuItemProps = {
    text: string,
    onClick: () => void
}

function MenuItem({text, onClick}: MenuItemProps) {
    return (
        <a onClick={() => onClick()}>{text}</a>
    )
}

export default MenuItem;