<%@ Page Language="C#" ValidateRequest="false" EnableSessionState="false" EnableViewState="false" ResponseEncoding="utf-8" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Net.Mail" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Text.RegularExpressions" %>
<%@ Import Namespace="System.Web" %>
<script runat="server">
static readonly Regex EmailPattern = new Regex(@"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$", RegexOptions.Compiled);
static readonly Regex LetterPattern = new Regex(@"\p{L}", RegexOptions.Compiled);

void Page_Load(object sender, EventArgs e) {
  Response.TrySkipIisCustomErrors = true;
  Response.Charset = "utf-8";
  Response.Cache.SetCacheability(HttpCacheability.NoCache);
  bool asJson = (Request.Headers["Accept"] ?? "").IndexOf("application/json", StringComparison.OrdinalIgnoreCase) >= 0;

  if (!String.Equals(Request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase)) {
    Finish(asJson, 405, false, "Metoda nu este permisă.", null);
    return;
  }

  if (!String.IsNullOrEmpty(Field("ae_leave_blank")) || !String.IsNullOrEmpty(Field("website"))) {
    Finish(asJson, 200, true, "Mulțumim. Cererea a fost înregistrată.", null);
    return;
  }

  var fields = new Dictionary<string, string>();
  string parentName = Field("parentName");
  string childName = Field("childName");
  string ageText = Field("age");
  string courseId = Field("course");
  string phone = Field("phone");
  string email = Field("email");
  string message = Field("message");

  if (!NameOk(parentName)) fields["parentName"] = "Completează numele părintelui, fără cifre.";
  if (!NameOk(childName)) fields["childName"] = "Completează numele copilului, fără cifre.";

  int age;
  string ageDigits = Regex.Replace(ageText, @"\D", "");
  if (!Int32.TryParse(ageDigits, out age) || age < 6 || age > 19) {
    fields["age"] = "Introdu o vârstă între 6 și 19 ani.";
  }

  string courseTitle;
  if (!Courses().TryGetValue(courseId, out courseTitle)) fields["course"] = "Alege un curs.";
  if (!PhoneOk(phone)) fields["phone"] = "Introdu un număr de telefon valid, de exemplu 0722 123 456.";
  if (email.Length > 0 && (email.Length > 120 || !EmailPattern.IsMatch(email))) {
    fields["email"] = "Introdu un email valid sau lasă câmpul gol.";
  }
  if (message.Length > 1000) fields["message"] = "Mesajul poate avea cel mult 1000 de caractere.";

  if (fields.Count > 0) {
    var summary = new StringBuilder();
    foreach (var pair in fields) {
      if (summary.Length > 0) summary.Append(" ");
      summary.Append(pair.Value);
    }
    Finish(asJson, 400, false, summary.ToString(), fields);
    return;
  }

  Dictionary<string, string> smtp;
  try {
    smtp = ReadSettings(Server.MapPath("~/smtp.config"));
  } catch {
    Finish(asJson, 500, false, "Trimiterea prin email nu este configurată încă. Sună la 0770 727 722.", null);
    return;
  }

  string host = Setting(smtp, "host");
  string user = Setting(smtp, "user");
  string password = Setting(smtp, "password");
  string fromAddress = Setting(smtp, "from");
  string toAddress = Setting(smtp, "to");
  int port;
  if (!Int32.TryParse(Setting(smtp, "port"), out port) || port < 1 || port > 65535) port = 587;
  bool ssl = !String.Equals(Setting(smtp, "ssl"), "false", StringComparison.OrdinalIgnoreCase);

  if (host.Length == 0 || user.Length == 0 || password.Length == 0 || fromAddress.Length == 0 || toAddress.Length == 0) {
    Finish(asJson, 500, false, "Trimiterea prin email nu este configurată încă. Sună la 0770 727 722.", null);
    return;
  }

  string body = "Cerere de lecție demo ActivEdu\n\n"
    + "Părinte: " + OneLine(parentName) + "\n"
    + "Copil: " + OneLine(childName) + "\n"
    + "Vârstă: " + age.ToString() + "\n"
    + "Curs: " + courseTitle + "\n"
    + "Telefon: " + OneLine(phone) + "\n"
    + "Email: " + (email.Length == 0 ? "—" : OneLine(email)) + "\n"
    + "Mesaj: " + (message.Length == 0 ? "—" : message.Replace("\r\n", "\n").Replace('\r', '\n'));

  try {
    using (var mail = new MailMessage()) {
      mail.From = new MailAddress(fromAddress, "ActivEdu");
      mail.To.Add(toAddress);
      foreach (string copy in Setting(smtp, "bcc").Split(new char[] { ',', ';' })) {
        string address = copy.Trim();
        if (address.Length == 0) continue;
        try { mail.Bcc.Add(new MailAddress(address)); } catch { }
      }
      mail.Subject = "Lecție demo — " + OneLine(childName);
      mail.Body = body;
      mail.BodyEncoding = Encoding.UTF8;
      mail.SubjectEncoding = Encoding.UTF8;
      mail.IsBodyHtml = false;
      if (email.Length > 0) {
        try { mail.ReplyToList.Add(new MailAddress(email, OneLine(parentName))); } catch { }
      }
      using (var client = new SmtpClient(host, port)) {
        client.EnableSsl = ssl;
        client.DeliveryMethod = SmtpDeliveryMethod.Network;
        client.UseDefaultCredentials = false;
        client.Credentials = new NetworkCredential(user, password);
        client.Timeout = 20000;
        client.Send(mail);
      }
    }
  } catch {
    Finish(asJson, 502, false, "Nu am putut trimite cererea. Încearcă din nou sau sună la 0770 727 722.", null);
    return;
  }

  Finish(asJson, 200, true, "Mulțumim, " + parentName + ". Cererea pentru " + childName + " a ajuns la ActivEdu. Te contactăm la " + phone + ".", null);
}

string Field(string name) {
  string value = Request.Form[name];
  return value == null ? "" : value.Trim();
}

static Dictionary<string, string> Courses() {
  return new Dictionary<string, string> {
    { "scratch", "Scratch și robotică introductivă" },
    { "algoritmi", "Algoritmi și robotică avansată" },
    { "python-robotica-apps", "Python: Aplicații Grafice și Programare de Roboți" },
    { "python-liceu", "Python: Algoritmică și Informatică de Liceu" }
  };
}

static bool NameOk(string name) {
  if (name == null || name.Length < 2 || name.Length > 80) return false;
  if (Regex.IsMatch(name, @"[0-9<>]")) return false;
  return LetterPattern.IsMatch(name);
}

static bool PhoneOk(string phone) {
  string digits = Regex.Replace(phone ?? "", @"\D", "");
  if (digits.StartsWith("0040")) digits = "0" + digits.Substring(4);
  else if (digits.StartsWith("40") && digits.Length == 11) digits = "0" + digits.Substring(2);
  else if (digits.Length == 9 && (digits.StartsWith("2") || digits.StartsWith("3") || digits.StartsWith("7"))) digits = "0" + digits;
  return Regex.IsMatch(digits, @"^0\d{9}$");
}

static Dictionary<string, string> ReadSettings(string path) {
  var settings = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
  if (!File.Exists(path)) return settings;
  foreach (string raw in File.ReadAllLines(path, Encoding.UTF8)) {
    string line = raw.Trim();
    if (line.Length == 0 || line.StartsWith("#")) continue;
    int split = line.IndexOf('=');
    if (split < 1) continue;
    settings[line.Substring(0, split).Trim()] = line.Substring(split + 1).Trim();
  }
  return settings;
}

static string Setting(Dictionary<string, string> settings, string key) {
  string value;
  return settings.TryGetValue(key, out value) ? value.Trim() : "";
}

static string OneLine(string value) {
  return (value ?? "").Replace("\r", " ").Replace("\n", " ").Trim();
}

void Finish(bool asJson, int status, bool ok, string message, Dictionary<string, string> fields) {
  Response.StatusCode = status;
  if (asJson) {
    Response.ContentType = "application/json";
    var json = new StringBuilder();
    json.Append("{\"ok\":").Append(ok ? "true" : "false");
    json.Append(",\"message\":\"").Append(JsonEscape(message)).Append("\"");
    if (fields != null && fields.Count > 0) {
      json.Append(",\"fields\":{");
      bool first = true;
      foreach (var pair in fields) {
        if (!first) json.Append(",");
        first = false;
        json.Append("\"").Append(JsonEscape(pair.Key)).Append("\":\"").Append(JsonEscape(pair.Value)).Append("\"");
      }
      json.Append("}");
    }
    json.Append("}");
    Response.Write(json.ToString());
    return;
  }

  Response.ContentType = "text/html";
  Response.Write("<!DOCTYPE html><html lang=\"ro\"><head><meta charset=\"utf-8\"><title>Cerere demo</title></head><body><p>");
  Response.Write(HttpUtility.HtmlEncode(message));
  Response.Write("</p><p><a href=\"index.html#contact\">Înapoi la formular</a></p></body></html>");
}

static string JsonEscape(string value) {
  if (value == null) return "";
  return value.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", "").Replace("\n", "\\n");
}
</script>
