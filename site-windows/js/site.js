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

  function nameOk(name) {
    if (name.length < 2 || name.length > 80) return false;
    if (/[0-9<>]/.test(name)) return false;
    try {
      return /\p{L}/u.test(name);
    } catch (ignore) {
      return true;
    }
  }

  function phoneDigits(phone) {
    var digits = phone.replace(/\D/g, "");
    if (digits.indexOf("0040") === 0) digits = "0" + digits.slice(4);
    else if (digits.indexOf("40") === 0 && digits.length === 11) digits = "0" + digits.slice(2);
    else if (digits.length === 9 && /^[237]/.test(digits)) digits = "0" + digits;
    return digits;
  }

  function phoneOk(phone) {
    return /^0\d{9}$/.test(phoneDigits(phone));
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var errors = {};
    if (!nameOk(value("parentName"))) errors.parentName = "Completează numele părintelui, fără cifre.";
    if (!nameOk(value("childName"))) errors.childName = "Completează numele copilului, fără cifre.";
    var age = Number(value("age").replace(/\D/g, ""));
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
        alert.textContent = keys.map(function (key) { return errors[key]; }).join(" ");
      }
      var focus = document.getElementById(keys[0]);
      if (focus) focus.focus();
      return;
    }

    var submitButton = form.querySelector("button[type=submit]");
    if (submitButton) submitButton.disabled = true;
    if (alert) alert.hidden = true;
    fetch("contact.aspx", {
      method: "POST",
      body: new URLSearchParams(new FormData(form)).toString(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    }).then(function (response) {
      return response.text().then(function (text) {
        var payload = null;
        try { payload = JSON.parse(text); } catch (ignore) { payload = null; }
        return payload;
      });
    }).then(function (payload) {
      if (submitButton) submitButton.disabled = false;
      if (!payload || !payload.ok) {
        var fields = payload && payload.fields ? payload.fields : {};
        Object.keys(fields).forEach(function (key) {
          var slot = document.querySelector('[data-error="' + key + '"]');
          if (slot) slot.textContent = fields[key];
          var field = document.getElementById(key);
          if (field) field.setAttribute("aria-invalid", "true");
        });
        var fieldMessages = Object.keys(fields).map(function (key) { return fields[key]; });
        if (alert) {
          alert.hidden = false;
          alert.textContent = fieldMessages.length
            ? fieldMessages.join(" ")
            : (payload && payload.message
              ? payload.message
              : "Nu am putut trimite cererea. Sună la " + (settings.phoneDisplay || "0770 727 722") + ".");
        }
        return;
      }
      var card = document.querySelector("[data-form-card]");
      if (!card) return;
      card.textContent = "";
      var status = document.createElement("div");
      status.className = "status";
      status.setAttribute("role", "status");
      var kicker = document.createElement("p");
      kicker.className = "kicker";
      kicker.textContent = "Cerere trimisă";
      var title = document.createElement("h3");
      title.textContent = "Am trimis înscrierea.";
      var copy = document.createElement("p");
      copy.textContent = payload.message;
      var action = document.createElement("p");
      var link = document.createElement("a");
      link.className = "btn btn-primary";
      link.href = "index.html#contact";
      link.textContent = "Trimite o altă cerere";
      action.appendChild(link);
      status.appendChild(kicker);
      status.appendChild(title);
      status.appendChild(copy);
      status.appendChild(action);
      card.appendChild(status);
    }).catch(function () {
      if (submitButton) submitButton.disabled = false;
      if (alert) {
        alert.hidden = false;
        alert.textContent = "Nu am putut trimite cererea. Sună la " + (settings.phoneDisplay || "0770 727 722") + ".";
      }
    });
  });
})();
