export function unreadNotificationsFunc(notifications) {
  return notifications.filter((n) => n.isRead === false);
}
