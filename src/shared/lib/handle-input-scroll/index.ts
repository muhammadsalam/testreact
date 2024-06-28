export const handleInputScroll = () => {
    const root = (document.querySelector('#root') as HTMLElement);
    root.style.overflow = "hidden";

    setTimeout(() => {
        root.style.overflow = "auto";
    }, 450);
}
