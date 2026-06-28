const roles = [
    "ICT Undergraduate",
    "Aspiring Business Analyst",
    "Aspiring Data Analyst",
    "Excel Enthusiast",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText = document.getElementById("typing-text");

function typeEffect(){

    const currentRole = roles[roleIndex];

    if(!isDeleting){

        typingText.textContent = currentRole.substring(0,charIndex++);

        if(charIndex > currentRole.length){

            isDeleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }

    else{

        typingText.textContent = currentRole.substring(0,charIndex--);

        if(charIndex < 0){

            isDeleting = false;

            roleIndex = (roleIndex+1)%roles.length;

        }

    }

    setTimeout(typeEffect,isDeleting?40:90);

}

typeEffect();

const counters = document.querySelectorAll(".count");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const current = +counter.innerText;

                const increment = target / 30;

                if(current < target){
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        }
    });
});

counters.forEach(counter => {
    observer.observe(counter);
});