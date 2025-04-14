"use client";
import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MessageCircleIcon,
  Send,
  Loader2,
} from "lucide-react";
import { Comment, CommentResponse, GetCommentsParams } from "~/lib/comments";
import { Dictionary } from "~/config/dictionaries";
import { use, useCallback, useMemo, useState, useTransition } from "react";
import { Skeleton } from "~/components/ui/skeleton";

type CommentsProps = {
  commentsPromise: Promise<CommentResponse>;
  loadChildCommentsAction: (
    params: GetCommentsParams
  ) => Promise<CommentResponse>;
  translations: Pick<Dictionary, "general">;
  proposalId: string;
};

const CommentCard = ({
  comment,
  translations,
  loadChildCommentsAction,
  level = 0,
}: Pick<CommentsProps, "translations"> & {
  loadChildCommentsAction?: (
    parentCommentId: string,
    page: number
  ) => Promise<CommentResponse>;
  comment: Comment;
  level?: number;
}) => {
  const [childComments, setChildComments] = useState<Comment[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const hasChildren = useMemo(
    () => comment.attributes.subcommens_number > 0,
    [comment]
  );

  const loadChildComments = useCallback(
    async (page = currentPage) => {
      if (!loadChildCommentsAction) return;
      setLoading(true);
      try {
        const response = await loadChildCommentsAction(
          comment.id.toString(),
          page
        );
        if (page === 1) {
          setChildComments(response.data);
        } else {
          setChildComments((prev) => [...prev, ...response.data]);
        }

        const pagination = response.meta.pagination;
        if (pagination) {
          setHasMore(pagination.page < pagination.pageCount);
          setCurrentPage(pagination.page);
        }
      } catch (error) {
        console.error("Error loading child comments:", error);
      } finally {
        setLoading(false);
      }
    },
    [loadChildCommentsAction, currentPage, comment]
  );

  const handleToggleChildren = useCallback(async () => {
    if (!expanded && childComments.length === 0) {
      startTransition(() => {
        setExpanded(true);
      });
      await loadChildComments();
    } else {
      startTransition(() => {
        setExpanded(!expanded);
      });
    }
  }, [expanded, loadChildComments, childComments]);

  const handleLoadMore = useCallback(() => {
    loadChildComments(currentPage + 1);
  }, [loadChildComments, currentPage]);

  return (
    <div className="comment-thread">
      <div className="flex gap-4">
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
              {new Date(comment.attributes.updatedAt).toLocaleDateString(
                translations.general.locale
              )}
            </div>
          </div>
          <p className="text-foreground">{comment.attributes.comment_text}</p>

          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-sm text-muted-foreground mt-2"
              onClick={handleToggleChildren}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : expanded ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
              {translations.general.replies} (
              {comment.attributes.subcommens_number})
            </Button>
          )}
        </div>
      </div>

      {expanded && (
        <div className={`ml-8 pl-4 border-l border-border mt-4 space-y-6`}>
          {loading && childComments.length === 0 ? (
            <CommentSkeleton />
          ) : (
            <>
              {childComments.map((childComment) => (
                <CommentCard
                  key={childComment.id}
                  comment={childComment}
                  translations={translations}
                  level={level + 1}
                />
              ))}

              {hasMore && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-muted-foreground"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      {translations.general.loading}
                    </>
                  ) : (
                    translations.general.loadMore
                  )}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export function Comments({
  commentsPromise,
  loadChildCommentsAction,
  translations,
  proposalId,
}: CommentsProps) {
  const commentsResponse = use(commentsPromise);
  const comments = useMemo(() => commentsResponse.data, [commentsResponse]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useMemo(() => {
    setAllComments(comments);
    const pagination = commentsResponse.meta.pagination;
    if (pagination) {
      setHasMore(pagination.page < pagination.pageCount);
      setCurrentPage(pagination.page);
    }
  }, [commentsResponse, comments]);

  const loadChildComments = useCallback(
    async (parentId: string, page = 1) => {
      const params: GetCommentsParams = {
        proposalId,
        parentCommentId: parentId,
        page,
        pageSize: 10,
        sortBy: { field: "createdAt", direction: "asc" },
      };

      return await loadChildCommentsAction(params);
    },
    [loadChildCommentsAction, proposalId]
  );

  const loadMoreComments = useCallback(async () => {
    setLoadingMore(true);
    startTransition(async () => {
      try {
        const nextPage = currentPage + 1;
        const params: GetCommentsParams = {
          proposalId,
          page: nextPage,
          pageSize: 25,
          sortBy: { field: "createdAt", direction: "desc" },
        };

        const response = await loadChildCommentsAction(params);
        setAllComments((prev) => [...prev, ...response.data]);

        const pagination = response.meta.pagination;
        if (pagination) {
          setHasMore(pagination.page < pagination.pageCount);
          setCurrentPage(pagination.page);
        }
      } catch (error) {
        console.error("Error loading more comments:", error);
      } finally {
        setLoadingMore(false);
      }
    });
  }, [loadChildCommentsAction, currentPage, proposalId]);

  return (
    <Card className="w-full mx-auto bg-card text-card-foreground">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {translations.general.comments} (
              {commentsResponse.meta.pagination?.total || allComments.length})
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <Textarea
                placeholder={translations.general.commentPlaceholder}
                className="min-h-[100px] bg-background text-foreground border-border placeholder:text-muted-foreground"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newCommentText.trim() || isPending}
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {translations.general.submitComment}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {allComments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircleIcon className="mx-auto h-12 w-12 opacity-50 mb-2" />
                <p>{translations.general.noComments}</p>
              </div>
            ) : (
              <>
                {allComments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    translations={translations}
                    loadChildCommentsAction={(parentId, page) =>
                      loadChildComments(parentId, page)
                    }
                  />
                ))}

                {hasMore && (
                  <Button
                    variant="outline"
                    className="w-full text-center"
                    onClick={loadMoreComments}
                    disabled={isPending || loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {translations.general.loading}
                      </>
                    ) : (
                      translations.general.loadMore
                    )}
                  </Button>
                )}
              </>
            )}
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
              <CommentSkeleton key={index} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const CommentSkeleton = () => (
  <div className="flex gap-4 animate-pulse">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-16 w-full" />
    </div>
  </div>
);
