export function timeAgo(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 60 * 60) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 60 * 60 * 24) {
    const hours = Math.floor(diffInSeconds / (60 * 60));
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 60 * 60 * 24 * 7) {
    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 60 * 60 * 24 * 30) {
    const weeks = Math.floor(diffInSeconds / (60 * 60 * 24 * 7));
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 60 * 60 * 24 * 365) {
    const months = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}
