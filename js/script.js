const customers = [
  {
    id: 1,
    name: "Rosa Developers",
    img: "../images/rosa.jpg",
  },
  {
    id: 2,
    name: "Pyramid Developers",
    img: "../images/pyramid.jfif",
  },
  {
    id: 3,
    name: "Aurum IT Park",
    img: "../images/aurum.png",
  },
  {
    id: 4,
    name: "Paradise Developers",
    img: "../images/paradise.jfif",
  },
  {
    id: 5,
    name: "Metro Developers",
    img: "../images/metro.jfif",
  },
  {
    id: 6,
    name: "GAMI Developers",
    img: "../images/gami.jpg",
  },
  {
    id: 7,
    name: "Juhi Developers",
    img: "../images/juhi.jfif",
  },
  {
    id: 8,
    name: "Nahar Builders",
    img: "../images/nahar.png",
  },
];

$(document).ready(function () {
  loadCustomers();

  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    // removing smooth scroll on slide-up button click
    $("html").css("scrollBehavior", "auto");
  });

  $(".navbar .menu li a").click(function () {
    // applying again smooth scroll on menu items click
    $("html").css("scrollBehavior", "smooth");
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });
});

function getHTMLForCustomer(customerObj) {
  return `
  <div class='customer-card'>
    <div class="img-container">
      <img src="${customerObj.img}" alt="${customerObj.name}"/>
    </div>
    <p>${customerObj.name}</p>
  </div>
    `;
}

function loadCustomers() {
  let html = "";
  customers.forEach((customer) => {
    html += getHTMLForCustomer(customer);
  });
  html += "";

  $(".customer-carousel").html(html);
}

// send email
$("#emailForm").submit(function (e) {
  e.preventDefault();

  // loader for screen
  $(".send-email-btn").html("Sending...");

  // get user data to send
  const senderName = this[0].value;
  const senderEmail = this[1].value;
  const senderSubject = this[2].value;
  const senderMessage = this[3].value;

  const data = {
    name: senderName,
    email: senderEmail,
    subject: senderSubject,
    message: senderMessage,
  };

  // send email
  fetch("/.netlify/functions/send-emails", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
  }).then((res) => {
    console.log(res);
    // in case the email was not send
    if (res.status !== 200)
      return $(".send-email-btn").text("Please try again!");

    // clear the form
    $(this[0]).val("");
    $(this[1]).val("");
    $(this[2]).val("");
    $(this[3]).val("");
    $(".send-email-btn").text("Send To Me");
  });
});

// navbar collapse close after click
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((l) => {
  l.addEventListener("click", () => {
    $("#navbarSupportedContent").removeClass("show");
  });
});
