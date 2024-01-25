export const handleInputScroll = ({ target }: any) => {
    setTimeout(() => {
        scrollTo({
            top: scrollY + (target as HTMLElement).getClientRects()[0].top - 100,
            behavior: "smooth",
        });
    }, 400);
}