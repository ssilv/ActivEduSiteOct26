(function () {
  var settings = window.ACTIVEDU || {};
  var portal = settings.portalUrl || "https://app.activedu.ro";
  var clubEmail = settings.email || "contact@activedu.ro";

  document.querySelectorAll("[data-portal]").forEach(function (link) {
    link.href = portal;
  });
  document.querySelectorAll("[data-mail]").forEach(function (link) {
    link.href = "mailto:" + clubEmail;
    if (!link.textContent.trim() || link.dataset.mailLabel === "address") {
      link.textContent = clubEmail;
    }
  });

  var button = document.querySelector("[data-menu-button]");
  var panel = document.querySelector("[data-menu]");

  function setOpen(open) {
    if (!button || !panel) return;
    panel.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.querySelector(".icon-open").hidden = open;
    button.querySelector(".icon-close").hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    var label = button.querySelector(".sr-only");
    if (label) label.textContent = open ? "Închide meniul" : "Deschide meniul";
    if (open) {
      var first = panel.querySelector("a");
      if (first) first.focus();
    }
  }

  if (button && panel) {
    button.addEventListener("click", function () {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });
    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        setOpen(false);
        button.focus();
      }
    });
  }

  var params = new URLSearchParams(window.location.search);
  var course = params.get("curs");
  var select = document.querySelector("#course");
  if (course && select) {
    var option = select.querySelector('option[value="' + course.replace(/"/g, "") + '"]');
    if (option) select.value = course;
  }

  var form = document.querySelector("#inscriere");
  if (!form) return;

  function value(name) {
    var field = form.elements[name];
    return field ? String(field.value).trim() : "";
  }

  function phoneOk(phone) {
    var digits = phone.replace(/\D/g, "");
    return (digits.length === 10 && digits.charAt(0) === "0") || (digits.length === 11 && digits.indexOf("40") === 0);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var errors = {};
    var nameOk = /^\p{L}[\p{L}\s.'-]{1,79}$/u;
    if (!nameOk.test(value("parentName"))) errors.parentName = "Completează numele părintelui.";
    if (!nameOk.test(value("childName"))) errors.childName = "Completează numele copilului.";
    var age = Number(value("age"));
    if (!Number.isInteger(age) || age < 6 || age > 19) errors.age = "Introdu o vârstă între 6 și 19 ani.";
    if (!value("course")) errors.course = "Alege un curs.";
    if (!phoneOk(value("phone"))) errors.phone = "Introdu un număr de telefon valid, de exemplu 0722 123 456.";
    var email = value("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Introdu un email valid sau lasă câmpul gol.";

    form.querySelectorAll("[data-error]").forEach(function (node) { node.textContent = ""; });
    Array.prototype.forEach.call(form.elements, function (field) {
      if (field.id) field.setAttribute("aria-invalid", errors[field.id] ? "true" : "false");
    });
    var alert = document.querySelector("[data-form-alert]");
    var keys = Object.keys(errors);
    if (keys.length) {
      keys.forEach(function (key) {
        var slot = document.querySelector('[data-error="' + key + '"]');
        if (slot) slot.textContent = errors[key];
      });
      if (alert) {
        alert.hidden = false;
        alert.textContent = "Verifică câmpurile marcate și încearcă din nou.";
      }
      var focus = document.getElementById(keys[0]);
      if (focus) focus.focus();
      return;
    }

    var courseLabel = select.options[select.selectedIndex].text;
    var body = [
      "Cerere de lecție demo ActivEdu",
      "",
      "Părinte: " + value("parentName"),
      "Copil: " + value("childName"),
      "Vârstă: " + value("age"),
      "Curs: " + courseLabel,
      "Telefon: " + value("phone"),
      "Email: " + (email || "—"),
      "Mesaj: " + (value("message") || "—")
    ].join("\n");
    var mailto = "mailto:" + clubEmail
      + "?subject=" + encodeURIComponent("Lecție demo — " + value("childName"))
      + "&body=" + encodeURIComponent(body);

    var card = document.querySelector("[data-form-card]");
    if (!card) return;
    card.textContent = "";
    var status = document.createElement("div");
    status.className = "status";
    status.setAttribute("role", "status");
    var kicker = document.createElement("p");
    kicker.className = "kicker";
    kicker.textContent = "Email pregătit";
    var title = document.createElement("h3");
    title.textContent = "Trimite emailul din programul de mail.";
    var copy = document.createElement("p");
    copy.textContent = "Cererea pentru " + value("childName") + " este scrisă către " + clubEmail + ". Apasă Trimite în fereastra de email ca să ajungă la club. Poți suna și la " + (settings.phoneDisplay || "0770 727 722") + ".";
    var action = document.createElement("p");
    var link = document.createElement("a");
    link.className = "btn btn-primary";
    link.href = "#contact";
    link.textContent = "Completează din nou";
    link.addEventListener("click", function () { window.location.reload(); });
    action.appendChild(link);
    status.appendChild(kicker);
    status.appendChild(title);
    status.appendChild(copy);
    status.appendChild(action);
    card.appendChild(status);
    window.location.href = mailto;
  });
})();
