import React from 'react';
import ReactDOM from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

import App from '@/App.tsx';
const lifecycles = singleSpaReact({
    React,
    ReactDOMClient: ReactDOM,
    rootComponent: App,
    errorBoundary() {
        return <div>Error al cargar microfront </div>;
    },
    domElementGetter: () => {
        const id = 'auth-microfront-container';
        const el = document.getElementById(id);
        if (!el) {
            throw new Error(`Elemento con id "${id}" no encontrado en el layout del shell`);
        }
        return el;
    }

});
if (typeof document !== "undefined") {
    const currentUrl = import.meta.url; // la URL de este archivo JS
    const baseUrl = new URL('.', currentUrl).href; // obtiene el path base
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${baseUrl}school-microfront.css`; // apunta al CSS en el mismo host
    document.head.appendChild(link);
}

export const { bootstrap, mount, unmount } = lifecycles;