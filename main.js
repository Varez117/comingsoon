/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu-list'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    // Optimización: Usamos la variable navMenu ya definida arriba
    // (Antes seleccionaba incorrectamente el ID 'nav-menu' en lugar de 'nav-menu-list')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // Optimización: Usar scrollY es más moderno que pageYOffset
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')
        
        const sectionLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(sectionLink){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionLink.classList.add('active-link')
            }else{
                sectionLink.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== CODE TYPING ANIMATION ===============*/
// Lógica movida desde index.html para mantener el HTML limpio
document.addEventListener("DOMContentLoaded", () => {
    const codigo = document.getElementById("codigo");
    if (!codigo) return; // Previene errores si el elemento no existe

    const codeLines = [
        "def merge_sort(arr):",
        "    if len(arr) <= 1:",
        "        return arr",
        "",
        "    mid = len(arr) // 2",
        "    left = merge_sort(arr[:mid])",
        "    right = merge_sort(arr[mid:])",
        "",
        "    return merge(left, right)",
        "",
        "def merge(left, right):",
        "    result = []",
        "    i = j = 0",
        "",
        "    while i < len(left) and j < len(right):",
        "        if left[i] < right[j]:",
        "            result.append(left[i])",
        "            i += 1",
        "        else:",
        "            result.append(right[j])",
        "            j += 1",
        "",
        "    result += left[i:]",
        "    result += right[j:]",
        "    return result",
        "",
        "nums = [38, 27, 43, 3, 9, 82, 10]",
        "print(merge_sort(nums))"
    ];
    
    const cursor = document.querySelector(".cursor");
    let visibleLines = [];
    let lineaIndex = 0;
    let charIndex = 0;
    let currentLine = "";
    
    function updateBuffer() {
        const tempLines = [...visibleLines];
        if (currentLine !== "") {
            tempLines.push(currentLine);
        }
        if (tempLines.length > 10) {
            tempLines.shift();
        }
        codigo.innerHTML = tempLines.join("<br>");
    }

    function escribir() {
        if (lineaIndex < codeLines.length) {
            const fullLine = codeLines[lineaIndex];
            if (charIndex < fullLine.length) {
                currentLine += fullLine.charAt(charIndex);
                charIndex++;
                updateBuffer();
                setTimeout(escribir, 30);
            } else {
                visibleLines.push(currentLine);
                if (visibleLines.length > 10) {
                    visibleLines.shift();
                }
                currentLine = "";
                charIndex = 0;
                lineaIndex++;
                updateBuffer();
                setTimeout(escribir, 0);
            }
        } else {
            if(cursor) cursor.style.display = "none";
        }
    }
    
    escribir();
});
