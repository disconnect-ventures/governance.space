import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Star } from "lucide-react";
import { Progress } from "~/components/ui/progress";
import ComingSoon from "../layout/ComingSoon";
import { Dictionary } from "~/config/dictionaries";

type RatingProps = {
  ratings: {
    [stars: number]: {
      count: number;
    };
  };
  className?: string;
  translations: Dictionary["pageDrepsDetails"];
};

export function Rating({ ratings, className, translations }: RatingProps) {
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
    <Card className={`bg-card text-card-foreground ${className}`}>
      <CardHeader>
        <CardTitle className="text-foreground dark:text-neutral-100">
          {translations.rating}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ComingSoon>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-foreground dark:text-neutral-100">
                {average}
              </span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(average)
                        ? "fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400"
                        : "fill-muted text-muted dark:fill-neutral-700 dark:text-neutral-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground dark:text-neutral-400 whitespace-nowrap">
                {total} {translations.reviews}
              </span>
            </div>
            <div className="space-y-2">
              {Object.entries(ratings)
                .sort(
                  ([starsA], [starsB]) => parseInt(starsB) - parseInt(starsA)
                )
                .map(([stars, { count }]) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-16 text-sm whitespace-nowrap text-muted-foreground dark:text-neutral-400">
                      {stars} {translations.stars}
                    </span>
                    <Progress
                      value={(count / total) * 100}
                      className="bg-muted dark:bg-neutral-800"
                      color="#eab308"
                    />
                    <span className="w-8 text-sm text-right text-muted-foreground dark:text-neutral-400">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </ComingSoon>
        </div>
      </CardContent>
    </Card>
  );
}
