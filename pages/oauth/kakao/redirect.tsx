import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { atomLoading } from "@/utils/recoil/atoms";

const KakaoRedirect = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(atomLoading);
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  useEffect(() => {
    const processKakaoLogin = async () => {
      const code = router.query.code as string;
      if (!code) return;

      setLoading(true);

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

        const kakaoId = userRes.data?.id;
        const email = userRes.data?.kakao_account?.email ?? "";

        router.push({
          pathname: "/SignUp/ExtraInfo",
          query: {
            provider: "kakao",
            kakaoId: kakaoId,
            email,
          },
        });
      } catch (err) {
        console.error("OAuth process failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      processKakaoLogin();
    }
  }, [router, setLoading]);

  return <></>;
};

export default KakaoRedirect;
