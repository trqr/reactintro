import '../../styles/MenuItem.css'

type MenuItemProps = {
    text: string,
    onClick: () => void
}

function MenuItem({text, onClick}: MenuItemProps) {
    return (
        <span onClick={() => onClick()}>{text}</span>
    )
}

export default MenuItem;