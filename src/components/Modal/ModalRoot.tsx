import { useEffect, useState, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalRootProps {
    rootElementId?: string;
    children: ReactNode;
}

export const ModalRoot: FC<ModalRootProps> = ({ rootElementId = 'modal-root', children }) => {
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        let element = document.getElementById(rootElementId) as HTMLDivElement | null;

        if (!element) {
            element = document.createElement('div');
            element.setAttribute('id', rootElementId);

            document.body.appendChild(element);
        }

        setRootElement(element);

        return () => {
            if (element && element.childNodes.length === 0) {
                element.remove();
                setRootElement(null);
            }
        };
    }, [rootElementId]);

    if (!rootElement) return null;

    return createPortal(children, rootElement);
};
