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

},

topProducts: {

    title: "🏆 Highest Selling Product",

    question:
    "Which product generated the highest total sales revenue?",

    sql:
`SELECT
    p.Product_Name,
    ROUND(SUM(od.Sales), 2) AS Total_Sales
FROM order_detail od
JOIN product p
    ON od.Product_ID = p.Product_ID
GROUP BY
    p.Product_Name,
    p.Product_ID 
ORDER BY
    Total_Sales DESC
LIMIT 1;`,

    image:
    "../images/sql/highest-selling-product.png",

    insight:
    "This query identifies the product that generated the highest total sales revenue. It helps businesses recognize their best-performing products, optimize inventory planning, and develop targeted marketing strategies around high-demand items."

},

categorySales: {

    title: "📦 Sales by Category",

    question:
    "Which product categories generate the highest total sales revenue?",

    sql:
`SELECT
    p.Category,
    ROUND(SUM(od.Sales), 2) AS Total_Sales
FROM order_detail od
JOIN product p
    ON od.Product_ID = p.Product_ID
GROUP BY
    p.Category
ORDER BY
    Total_Sales DESC;`,

    image:
    "../images/sql/sales-by-category.png",

    insight:
    "This query calculates the total sales revenue for each product category. It enables businesses to identify high-performing categories, allocate inventory effectively, and prioritize marketing efforts toward the segments that contribute the most revenue."

},

salesByRegion: {

    title: "🌍 Sales by Region",

    question:
    "Which regions generate the highest total sales revenue?",

    sql:
`SELECT
    o.Region,
    ROUND(SUM(od.Sales), 2) AS Total_Sales
FROM order_detail od
JOIN orders o
    ON od.Order_ID = o.Order_ID
GROUP BY
    o.Region
ORDER BY
    Total_Sales DESC;`,

    image:
    "../images/sql/sales-by-region.png",

    insight:
    "This query summarizes total sales revenue across different regions. It enables businesses to identify high-performing markets, optimize regional sales strategies, allocate resources effectively, and support data-driven expansion decisions."

},

topCustomers: {

    title: "🏆 Top Customers by Revenue",

    question:
    "Which customers generated the highest total sales revenue?",

    sql:
`SELECT
    c.Customer_ID,
    c.Customer_Name,
    ROUND(SUM(od.Sales), 2) AS Total_Sales
FROM customer c
JOIN orders o
    ON c.Customer_ID = o.Customer_ID
JOIN order_detail od
    ON o.Order_ID = od.Order_ID
GROUP BY
    c.Customer_ID,
    c.Customer_Name
ORDER BY
    Total_Sales DESC
LIMIT 10;`,

    image:
    "../images/sql/top-customers.png",

    insight:
    "This query identifies the customers who contribute the highest sales revenue. Understanding top customers enables businesses to strengthen customer relationships, design loyalty programs, personalize marketing campaigns, and focus retention efforts on high-value customers."

},

segments: {

    title: "🏆 Sales across customer segments",

    question:
    "Which customer segment generated the highest total sales revenue?",

    sql:
`SELECT
    c.Segment,
    ROUND(SUM(od.Sales), 2) AS Total_Sales
FROM customer c
JOIN orders o
    ON c.Customer_ID = o.Customer_ID
JOIN order_detail od
    ON o.Order_ID = od.Order_ID
GROUP BY
    c.Segment
ORDER BY
    Total_Sales DESC;`,

    image:
    "../images/sql/customer-segment.png",

    insight:
    "This query summarizes total sales revenue across different customer segments."

},



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