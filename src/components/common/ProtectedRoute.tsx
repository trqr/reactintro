import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/useAuth.tsx";
import {type JSX} from "react";

type Props = {
    children: JSX.Element;
    requiredRoles?: string[];
};

const ProtectedRoute = ({children, requiredRoles}: Props) => {
    // @ts-expect-error blabla
    const {user, isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    if (requiredRoles && !requiredRoles.includes(user?.role)) {
        return <Navigate to="/" replace/>;
    }

    return children;
}

export default ProtectedRoute;