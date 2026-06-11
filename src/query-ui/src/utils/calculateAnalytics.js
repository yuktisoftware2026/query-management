export const calculateAnalytics = (data ,  setAnalytics) => {
  const stats = { OPEN: 0, INPROGRESS: 0, ARCHIVED: 0, CLOSED: 0 };
  data.forEach((query) => {
    if (stats[query.status] !== undefined) {
      stats[query.status]++;
    }
  });
  setAnalytics(stats);
};

