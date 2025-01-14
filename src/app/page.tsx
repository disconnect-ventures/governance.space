import {
  DRepsDirectory,
  DRepsDirectoryProps,
} from "~/components/features/dRepsDirectory";

export default function Home() {
  const dreps = [
    {
      avatarUrl: "https://avatars.githubusercontent.com/t/11181162?s=116&v=4",
      name: "User1",
      id: "drep1y22O0we9c9Okun36tzexarnz...",
      status: "Active",
      votingPower: "A 107,487,105",
      social: true,
      delegators: 3358,
      influencePower: "5.27%",
      voting: 120,
      registrationDate: "15/01/2023, 10:15",
    },
    {
      avatarUrl: "https://avatars.githubusercontent.com/t/11181162?s=116&v=4",
      name: "User2",
      id: "drep1y22O0we9c9Okun36tzexarnz2...",
      status: "Retired",
      votingPower: "A 107,487,105",
      social: true,
      delegators: 3358,
      influencePower: "5.27%",
      voting: 120,
      registrationDate: "15/01/2023, 10:15",
    },
    {
      avatarUrl: "https://avatars.githubusercontent.com/t/11181162?s=116&v=4",
      name: "User3",
      id: "drep1y22O0we9c9Okun36tzexarnz3...",
      status: "Inactive",
      votingPower: "A 107,487,105",
      social: true,
      delegators: 3358,
      influencePower: "5.27%",
      voting: 120,
      registrationDate: "15/01/2023, 10:15",
    },
  ];
  return (
    <div className="">
      <DRepsDirectory dreps={dreps as DRepsDirectoryProps["dreps"]} />
    </div>
  );
}
