import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

function convertDateToUTC(date: any) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

export function convertDateTime(date: any) {
  try {
    const formattedDate = format(convertDateToUTC(new Date(date)), 'PPP', {
      locale: ptBR,
    });

    return formattedDate;
  } catch (error) {
    return '';
  }
}
