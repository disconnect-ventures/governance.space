// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19796&t=GGJEhGlKd8rVords-4
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Star } from "lucide-react";
import { Progress } from "~/components/ui/progress";

type RatingProps = {
  ratings: {
    [stars: number]: {
      count: number;
    };
  };
  className?: string;
};

export function Rating({ ratings, className }: RatingProps) {
  const total = Object.values(ratings).reduce(
    (total, { count }) => total + count,
    0
  );
  const average = parseFloat(
    (
      Object.entries(ratings).reduce(
        (score, [stars, { count }]) => score + parseInt(stars) * count,
        0
      ) / total
    ).toFixed(1)
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Rating</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold">{average}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(average)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">
              {total} reviews
            </span>
          </div>

          <div className="space-y-2">
            {Object.entries(ratings)
              .sort(([starsA], [starsB]) => parseInt(starsB) - parseInt(starsA))
              .map(([stars, { count }]) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-16 text-sm whitespace-nowrap">
                    {stars} stars
                  </span>
                  <Progress value={(count / total) * 100} className="h-2" />
                  <span className="w-8 text-sm text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
