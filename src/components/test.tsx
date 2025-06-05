import {FC} from 'react';
import {useTranslation} from "react-i18next";

interface Props {
    test: string;
}

const MyComponent: FC<{test: string}> = ({test: string}: Props) => {
    const {t} = useTranslation();
    return (
        <div>
            
        </div>
    );
};

export default MyComponent;
