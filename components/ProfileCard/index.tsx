// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import ProfileCard from "@/components/ProfileCard";
// import MatchHistory from "@/components/MatchHistory";
// import ChampionStats from "@/components/ChampionStats";
// import { fetchSummonerData } from "@/utils/api";

// const Profile = () => {
//   const router = useRouter();
//   const { name } = router.query;

//   const [profileData, setProfileData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (name) {
//       fetchSummonerData(name).then((data) => {
//         setProfileData(data);
//         setIsLoading(false);
//       });
//     }
//   }, [name]);

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div>
//       <ProfileCard data={profileData} />
//       <MatchHistory matches={profileData?.matches} />
//       <ChampionStats stats={profileData?.championStats} />
//     </div>
//   );
// };

// export default Profile;
