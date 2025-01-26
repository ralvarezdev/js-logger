// Get the current date in the format
export default function GetFormattedDate({
                              locales = "en-US",
                              options = {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                              }
                          }) {
    const date = new Date();
    return new Intl.DateTimeFormat(locales, options).format(date);
}