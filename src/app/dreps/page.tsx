// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=30-346&t=GGJEhGlKd8rVords-4
import {
  DRepsDirectory,
  DRepsDirectoryProps,
} from "~/components/features/dreps/DRepsDirectory";
import { CallToAction } from "~/components/layout/CallToAction";

export default function Home() {
  const dreps = Array(25)
    .fill(null)
    .map((_, index) => ({
      avatarUrl: "https://avatars.githubusercontent.com/t/11181162?s=116&v=4",
      name: `Drep ${index + 1}`,
      id: `drep1y22O0we9c9Okun36tzexarnz${index}`,
      status:
        index % 3 === 0
          ? 2 * Math.random() > 1
            ? "Inactive"
            : "Retired"
          : "Active",
      votingPower: "A 107,487,105",
      social: true,
      delegators: 3358 + index,
      influencePower: "5.27%",
      voting: 120,
      registrationDate: "15/01/2023, 10:15",
    }));
  return (
    <div className="space-y-4">
      <DRepsDirectory dreps={dreps as DRepsDirectoryProps["dreps"]} />
      <CallToAction />
    </div>
  );
}
