const i18n = require("i18n");

module.exports.translator = (req, res, next) => {
  i18n.configure({
    locales: ["en", "fr", "es", "ur"], // Supported locales
    directory: __dirname + "/locales", // Path to translation files
    defaultLocale: "en", // Default language
    objectNotation: true, // Use object notation to access translations
  });
  const lang = req.headers["accept-language"] || "en";
  i18n.setLocale(lang);
  req.translate = (message) => {
    return i18n.__(message);
  };
  next();
};

// Define a middleware function to handle responses
module.exports.handleResponse = (req, res, next) => {
  const send = res.send;
  res.send = (body) => {
    if (typeof body === "object") {
      // If it is, translate each message using req.__()
      for (const prop in body) {
        if (typeof body[prop] === "string") {
          body[prop] = req.translate(body[prop]);
        }
      }
    }

    // Call the original res.send() function with the translated body
    send.call(res, body);
  };

  next();
};
