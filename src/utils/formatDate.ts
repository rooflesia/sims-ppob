export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };
  