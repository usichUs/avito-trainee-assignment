export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "только что";
  if (diffMins < 60) return `${diffMins} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  if (diffDays < 7) return `${diffDays} дн. назад`;

  return formatDate(dateString);
}

export function formatTimeOnSite(dateString: string): string {
  const registeredDate = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - registeredDate.getTime();
  const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffYears >= 1) {
    const years = diffYears;
    const monthsRemainder = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );

    if (monthsRemainder > 0) {
      return `${years} ${declension(
        years,
        "год",
        "года",
        "лет"
      )} ${monthsRemainder} ${declension(
        monthsRemainder,
        "месяц",
        "месяца",
        "месяцев"
      )}`;
    }
    return `${years} ${declension(years, "год", "года", "лет")}`;
  }

  if (diffMonths >= 1) {
    return `${diffMonths} ${declension(
      diffMonths,
      "месяц",
      "месяца",
      "месяцев"
    )}`;
  }

  if (diffDays >= 1) {
    return `${diffDays} ${declension(diffDays, "день", "дня", "дней")}`;
  }

  return "меньше дня";
}

function declension(
  number: number,
  one: string,
  two: string,
  five: string
): string {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return five;
  if (n1 > 1 && n1 < 5) return two;
  if (n1 === 1) return one;
  return five;
}
