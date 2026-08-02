export const getUserRoleFromEmail = (email) => {
  if (email.includes("@admin.tuke.sk")) {
    return "admin";
  } else if (email.includes("@student.tuke.sk")) {
    return "student";
  } else if (email.includes("@tuke.sk")) {
    return "professor";
  }
  return null;
};
