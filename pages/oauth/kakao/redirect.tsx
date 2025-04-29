import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase/supabaseClient";
import axios from "axios";

const KakaoRedirect = () => {
  const router = useRouter();
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  useEffect(() => {
    const processKakaoLogin = async () => {
      const code = router.query.code as string;
      if (!code) return;

      try {
        const tokenRes = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: "ecb8c1ddaa0bdc9f14504b3e7b60b5db",
            redirect_uri: redirectUri,
            code,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const accessToken = tokenRes?.data?.access_token;

        const userRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const email = userRes.data?.kakao_account.email;
        const nickname = userRes.data?.kakao_account.profile.nickname;
        const kakaoId = userRes.data?.id;

        const { data: user } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();

        if (!user) {
          const { error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: kakaoId.toString(),
          });

          if (signUpError) {
            console.error("Sign-up failed:", signUpError.message);
            return;
          }

          await supabase.from("users").insert([
            {
              email,
              nickname,
              provider: "kakao",
            },
          ]);
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email,
          password: kakaoId.toString(),
        });

        if (signInError) {
          console.error("Sign-in failed:", signInError.message);
          return;
        }

        console.log("Login successful");
        router.push("/");
      } catch (err) {
        console.error("OAuth process failed:", err);
      }
    };

    if (router.isReady) {
      processKakaoLogin();
    }
  }, [router]);

  return <div>Logging in...</div>;
};

export default KakaoRedirect;
