export const isUserAlreadyFollowing = (userFollows, userId) => {
  return userFollows?.some(follow => follow.id === userId);
};

export const isPostAlreadyLiked = (user, likes) => {

  return likes?.some(like => like.id === user?.id);
};
