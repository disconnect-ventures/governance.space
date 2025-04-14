import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { Comment } from "~/lib/comments";
import { Dictionary } from "~/config/dictionaries";

type CommentsProps = {
  comments: Array<Comment>;
  translations: Pick<Dictionary, "general">;
};

export function Comments({ comments, translations }: CommentsProps) {
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
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>0</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>0</span>
                    </Button>
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
