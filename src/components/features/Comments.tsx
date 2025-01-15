// https://www.figma.com/design/bfEklPIeZVRf0P6xC6f1e7/Governance-Space?node-id=50-19796&t=GGJEhGlKd8rVords-4
import { Card, CardContent } from "~/components/ui/card";
import { DRep } from "~/lib/dreps";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";

type CommentsProps = {
  drep: DRep;
};

export function Comments({}: CommentsProps) {
  const comments = [
    {
      id: 1,
      author: "Maria Silva",
      content:
        "Excelente trabalho na última assembleia! Suas colocações foram muito pertinentes.",
      timestamp: "2024-03-15T14:30:00Z",
      likes: 12,
      dislikes: 1,
      avatarUrl: "",
    },
    {
      id: 2,
      author: "João Santos",
      content:
        "Gostaria de saber sua posição sobre o projeto de mobilidade urbana.",
      timestamp: "2024-03-14T09:15:00Z",
      likes: 8,
      dislikes: 2,
      avatarUrl: "",
    },
  ];

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
                  <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{comment.author}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(comment.timestamp).toDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <div className="flex gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>{comment.dislikes}</span>
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
