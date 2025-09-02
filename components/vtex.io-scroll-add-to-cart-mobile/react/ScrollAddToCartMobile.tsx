import { useEffect } from 'react'
 
const ScrollAddToCartMobile = () => {

   ////////////Agregar al carrito position fixed al hacer scroll en la PDP
useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  if (!mediaQuery.matches) return;

  const btn = document.querySelector<HTMLElement>(
    ".vtex-flex-layout-0-x-flexRow--productButton .vtex-button"
  );
  if (!btn) return;

  const originalParent = btn.parentElement;
  const placeholder = document.createElement("div");
  placeholder.style.display = "none";

  const transitionStyle = "all 0.5s ease-in-out";
  let isFixed = false;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const triggerPoint = window.innerHeight * 0.9;

    if (scrollPosition > triggerPoint && !isFixed) {
      isFixed = true;

      // Insertar un placeholder para evitar salto de layout
      placeholder.style.height = `${btn.offsetHeight}px`;
      placeholder.style.display = "block";
      originalParent?.insertBefore(placeholder, btn);

      // Fijar el botón con transición
      btn.style.transition = transitionStyle;
      btn.style.position = "fixed";
      btn.style.left = "0";
      btn.style.right = "0";
      btn.style.bottom = "-100%";
      btn.style.width = "100%";
      btn.style.zIndex = "9999";
      btn.style.height = "44px";
      btn.style.borderRadius = "0";

      // Forzar reflow antes de animar
      requestAnimationFrame(() => {
        btn.style.bottom = "0";
      });
    }

    if (scrollPosition <= triggerPoint && isFixed) {
      isFixed = false;

      // Animar hacia abajo
      btn.style.bottom = "-100%";

      // Luego de la animación, restaurar
      setTimeout(() => {
        btn.style.position = "";
        btn.style.left = "";
        btn.style.right = "";
        btn.style.bottom = "";
        btn.style.width = "";
        btn.style.zIndex = "";
        btn.style.transition = "";
        btn.style.borderRadius = "100px";
        placeholder.remove();
      }, 300); // igual al tiempo de transición
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
////////////Agregar al carrito position fixed al hacer scroll en la PDP
 
  return (
    null
  );
};
 
export default ScrollAddToCartMobile;