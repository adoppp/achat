import { useNavigate } from "react-router";

export const useSidebarHeader = () => {
    const navigate = useNavigate();

    return { navigate };
};