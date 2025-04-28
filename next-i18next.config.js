module.exports = {
  i18n: {
    locales: ["en", "ko"],
    defaultLocale: "en",
  },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",
};
