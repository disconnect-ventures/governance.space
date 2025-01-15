// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19796&t=GGJEhGlKd8rVords-4
import { Card, CardContent } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { Comment } from "~/lib/comments";

type CommentsProps = {
  drep: DRep;
  comments: Array<Comment>;
};

export function Comments({ comments }: CommentsProps) {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Comments ({comments.length})
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <Textarea
                placeholder="Faça uma pergunta ao DRep..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button className="flex items-center gap-2 bg-blue-600">
                <Send className="w-4 h-4" />
                Submit Comment
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="w-10 h-10">
                  {/* <AvatarImage src={""} alt={comment.attributes.user_govtool_username} /> */}
                  <AvatarFallback>
                    {comment.attributes.user_govtool_username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {comment.attributes.user_govtool_username}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(comment.attributes.updatedAt).toDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {comment.attributes.comment_text}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>0</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
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
