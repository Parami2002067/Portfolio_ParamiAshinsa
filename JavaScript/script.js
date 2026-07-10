console.log("JavaScript is connected");

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

if(typingText){

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

}


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

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
        } else {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        }

    });

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");

        });

    });

}

document.addEventListener("DOMContentLoaded", function () {


const modal = document.getElementById("sqlModal");

const modalBody = document.getElementById("modalBody");

const closeBtn = document.querySelector(".close-modal");

const queryButtons = document.querySelectorAll(".query-btn");
console.log("SQL buttons found:", queryButtons.length);



console.log(modal);
console.log(modalBody);
console.log(closeBtn);
console.log(queryButtons);



const queryData = {

    totalSales: {

        title: "📊 Total Sales Analysis",

        question:
        "What is the total revenue generated from all sales transactions?",

        sql:
`SELECT
ROUND(SUM(Sales),2) AS Total_Sales
FROM order_detail;`,

        image:
        "../images/sql/total-sales.png",

        insight:
        "This query calculates the total sales revenue generated across all customer orders. It provides a high-level KPI that reflects overall business performance."

    },
    totalProfit: {

    title: "📈 Total Profit Analysis",

    question:
    "What is the total profit generated from all completed sales transactions?",

    sql:
`SELECT
ROUND(SUM(Profit),2) AS Total_Profit
FROM order_detail;`,

    image:
    "../images/sql/total-profit.png",

    insight:
    "This query calculates the total profit earned after all sales transactions. Unlike total sales, profit reflects the actual earnings after considering costs and discounts, making it a key indicator of business performance."

},

averageOrder: {

    title: "🛒 Average Order Value Analysis",

    question:
    "What is the average revenue generated from each customer order?",

    sql:
`SELECT
    ROUND(AVG(Order_Total), 2) AS Average_Order_Value
FROM (
    SELECT
        Order_ID,
        SUM(Sales) AS Order_Total
    FROM order_detail
    GROUP BY Order_ID
) AS OrderSummary;`,

    image:
    "../images/sql/average-order-value.png",

    insight:
    "This query calculates the average value of each customer order by first summing the sales for every order and then averaging those totals. Monitoring Average Order Value helps businesses evaluate customer purchasing behavior and identify opportunities to increase revenue through cross-selling, upselling, and promotional strategies."

}

};



if(queryButtons.length > 0 && modal && modalBody){

    queryButtons.forEach(button => {

        button.addEventListener("click", function(){

            const selectedQuery = this.dataset.query;

            const data = queryData[selectedQuery];

            if(!data) return;


            modalBody.innerHTML = `

                <h2>${data.title}</h2>

                <h3>Business Question</h3>

                <p>${data.question}</p>

                <h3>SQL Query</h3>

                <pre><code>${data.sql}</code></pre>


                <h3>Result</h3>

                <img src="${data.image}" alt="SQL Result">


                <div class="insight">

                    <h3>Business Insight</h3>

                    <p>${data.insight}</p>

                </div>

            `;


            modal.style.display = "block";


        });

    });

}



if(closeBtn){

    closeBtn.onclick = function(){

        modal.style.display = "none";

    };

}


window.onclick = function(event){

    if(event.target == modal){

        modal.style.display = "none";

    }

};


window.onclick = function(event){

    if(event.target == modal){

        modal.style.display = "none";

    }

};


});