export const blockVerticalScrollApp = (isBlock?: Boolean) => {
    const offset = isBlock ? 100 : 0;

    document.body.style.marginTop = `${offset}px`;
    document.body.style.paddingBottom = `${offset}px`;
    document.body.style.height = `calc(var(--tg-viewport-height) + ${offset}px)`;
    window.scrollTo(0, offset);
};