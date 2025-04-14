"use client";
import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Send } from "lucide-react";
import { CommentResponse } from "~/lib/comments";
import { Dictionary } from "~/config/dictionaries";
import { use, useMemo } from "react";
import { Skeleton } from "~/components/ui/skeleton";

type CommentsProps = {
  commentsPromise: Promise<CommentResponse>;
  translations: Pick<Dictionary, "general">;
};

export function Comments({ commentsPromise, translations }: CommentsProps) {
  const commentsResponse = use(commentsPromise);
  const comments = useMemo(() => commentsResponse.data, [commentsResponse]);

  return (
    <Card className="w-full mx-auto bg-card text-card-foreground">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {translations.general.comments} ({comments.length})
            </h2>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <Textarea
                placeholder={translations.general.commentPlaceholder}
                className="min-h-[100px] bg-background text-foreground border-border placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled
              >
                <Send className="w-4 h-4" />
                {translations.general.submitComment}
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {comment.attributes.user_govtool_username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-foreground">
                      {comment.attributes.user_govtool_username}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(
                        comment.attributes.updatedAt
                      ).toLocaleDateString(translations.general.locale)}
                    </div>
                  </div>
                  <p className="text-foreground">
                    {comment.attributes.comment_text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CommentsSkeleton() {
  const skeletonComments = Array(3).fill(null);

  return (
    <Card className="w-full mx-auto bg-card text-card-foreground">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-7 w-36" />
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <Skeleton className="w-full min-h-[100px] rounded-md" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>
          </div>
          <div className="space-y-6">
            {skeletonComments.map((_, index) => (
              <div key={index} className="flex gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="flex gap-4 mt-2">
                    <Skeleton className="h-8 w-16 rounded-md" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
