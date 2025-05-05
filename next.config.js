const nextI18NextConfig = require("./next-i18next.config");

module.exports = {
  ...nextI18NextConfig,
  env: {
    NEXT_PUBLIC_KAKAO_REDIRECT_URI: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
  images: {
    domains: ["ddragon.leagueoflegends.com"],
  },
};
